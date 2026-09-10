import {
  joinDepartments,
  type JoinCommittee,
  type JoinDepartment,
} from "@/data/qamatData";
import {
  ArrowLeft,
  Cpu,
  Megaphone,
  Settings,
  Share2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const DESKTOP_TREE_WIDTH = 1120;
const DESKTOP_TREE_HEIGHT = 610;

const DEPT_ICONS: Record<string, LucideIcon> = {
  "إدارة الموارد البشرية": Users,
  "إدارة الإعلام والمحتوى": Megaphone,
  "إدارة العلاقات العامة": Share2,
  "التقنية": Cpu,
  "إدارة التشغيل والتطوير": Settings,
};

type Selection = {
  department: string;
  committee: JoinCommittee;
};

type Branch = {
  key: string;
  department: JoinDepartment;
  tint: string;
  icon: LucideIcon;
};

type TreePositions = Record<
  string,
  {
    department: { x: number; y: number };
    committees: { x: number; y: number }[];
  }
>;

/*
 * توزيع اللابتوب متعمد أن يعطي التقنية والإعلام والموارد مساحة أكبر،
 * حتى لا تتقاطع بطاقات اللجان أو الفروع في النصف الأيمن من الشجرة.
 */
const DESKTOP_TREE_POSITIONS: TreePositions = {
  "إدارة التشغيل والتطوير": {
    department: { x: 110, y: 190 },
    committees: [
      { x: 70, y: 405 },
      { x: 165, y: 492 },
    ],
  },
  "إدارة العلاقات العامة": {
    department: { x: 330, y: 190 },
    committees: [
      { x: 290, y: 405 },
      { x: 385, y: 492 },
    ],
  },
  "التقنية": {
    department: { x: 550, y: 190 },
    committees: [{ x: 550, y: 458 }],
  },
  "إدارة الإعلام والمحتوى": {
    department: { x: 785, y: 190 },
    committees: [
      { x: 695, y: 408 },
      { x: 785, y: 505 },
      { x: 875, y: 408 },
    ],
  },
  "إدارة الموارد البشرية": {
    department: { x: 1010, y: 190 },
    committees: [
      { x: 970, y: 492 },
      { x: 1055, y: 405 },
    ],
  },
};

function connectorPath(fromX: number, fromY: number, toX: number, toY: number) {
  const bend = Math.max(54, Math.abs(toY - fromY) * 0.42);
  return `M ${fromX} ${fromY} C ${fromX} ${fromY + bend}, ${toX} ${toY - bend}, ${toX} ${toY}`;
}

export function JoinCommitteeTree({
  onContinue,
}: {
  onContinue: (department: string, committee: string) => void;
}) {
  const desktopViewportRef = useRef<HTMLDivElement>(null);
  const mobileStackRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [treeScale, setTreeScale] = useState(1);
  const [selection, setSelection] = useState<Selection | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visibleMobileBranches, setVisibleMobileBranches] = useState<Set<string>>(
    () => new Set(),
  );
  const [poppingMobileBranches, setPoppingMobileBranches] = useState<Set<string>>(
    () => new Set(),
  );

  const branches = useMemo<Branch[]>(() => {
    const byName = new Map(joinDepartments.map((department) => [department.name, department]));
    const branch = (name: string): Branch => {
      const department = byName.get(name)!;
      return {
        key: department.name,
        department,
        tint: `hsl(${department.tint})`,
        icon: DEPT_ICONS[department.name] ?? Users,
      };
    };

    return [
      branch("إدارة التشغيل والتطوير"),
      branch("إدارة العلاقات العامة"),
      branch("التقنية"),
      branch("إدارة الإعلام والمحتوى"),
      branch("إدارة الموارد البشرية"),
    ];
  }, []);

  const mobileBranches = useMemo(() => {
    const byName = new Map(branches.map((branch) => [branch.key, branch]));
    return [
      byName.get("إدارة التشغيل والتطوير")!,
      byName.get("إدارة العلاقات العامة")!,
      byName.get("إدارة الإعلام والمحتوى")!,
      byName.get("إدارة الموارد البشرية")!,
      byName.get("التقنية")!,
    ];
  }, [branches]);

  useEffect(() => {
    if (isMobile) return;
    const viewport = desktopViewportRef.current;
    if (!viewport) return;

    const updateScale = () => {
      const availableWidth = Math.max(0, viewport.clientWidth - 8);
      setTreeScale(Math.min(1, availableWidth / DESKTOP_TREE_WIDTH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const stack = mobileStackRef.current;
    if (!stack) return;

    // نخزن حالة ظهور بطاقات الجوال في React بدل إضافة class مباشرة إلى DOM.
    // بهذا تبقى البطاقة ظاهرة حتى لو فتح المستخدم وصف لجنة ثم أغلقه بدون المتابعة.
    const branchCards = Array.from(
      stack.querySelectorAll<HTMLElement>(".qamat-mobile-branch"),
    );
    if (!branchCards.length) return;

    const revealBranch = (key: string) => {
      setVisibleMobileBranches((current) => {
        if (current.has(key)) return current;
        const next = new Set(current);
        next.add(key);
        return next;
      });
    };

    const setBranchPopping = (key: string, shouldPop: boolean) => {
      setPoppingMobileBranches((current) => {
        const alreadyMatches = shouldPop ? current.has(key) : !current.has(key);
        if (alreadyMatches) return current;
        const next = new Set(current);
        if (shouldPop) next.add(key);
        else next.delete(key);
        return next;
      });
    };

    if (!("IntersectionObserver" in window)) {
      branchCards.forEach((branchCard) => {
        const key = branchCard.dataset.branchKey;
        if (key) {
          revealBranch(key);
          setBranchPopping(key, true);
        }
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const branchCard = entry.target as HTMLElement;
          const key = branchCard.dataset.branchKey;
          if (!key) return;

          if (entry.isIntersecting) {
            // البطاقة تبقى ظاهرة بعد أول مرة، لكن تعيد حركة الـPop كلما عادت لمجال الرؤية
            // سواء كان المستخدم ينزل للأسفل أو يرجع للأعلى.
            revealBranch(key);
            setBranchPopping(key, true);
          } else {
            // إزالة حالة الحركة فقط تجهزها لإعادة الـPop عند الدخول التالي، من دون إخفائها.
            setBranchPopping(key, false);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-6% 0px -10% 0px",
      },
    );

    branchCards.forEach((branchCard) => observer.observe(branchCard));

    return () => observer.disconnect();
  }, [isMobile, mobileBranches]);

  useEffect(() => {
    if (!selection) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelection(null);
    };

    document.addEventListener("keydown", closeOnEscape);
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.body.style.overflow = oldOverflow;
    };
  }, [selection]);

  const selectedKey = selection
    ? `${selection.department}::${selection.committee.name}`
    : null;

  function branchIsActive(branchKey: string) {
    return hovered?.startsWith(`${branchKey}::`) || selectedKey?.startsWith(`${branchKey}::`);
  }

  function committeeIsActive(branchKey: string, committeeName: string) {
    const key = `${branchKey}::${committeeName}`;
    return hovered === key || selectedKey === key;
  }

  function selectCommittee(branch: Branch, committee: JoinCommittee) {
    setSelection({
      department: branch.department.name,
      committee,
    });
  }

  return (
    <div className="mx-auto max-w-[1180px]">
      {isMobile ? (
        <div ref={mobileStackRef} className="qamat-mobile-tree" dir="rtl">
          <div className="qamat-mobile-root">
            <span className="qamat-tree-root-mark">✣</span>
            <span>فريق قامات</span>
          </div>

          <div className="qamat-mobile-trunk" aria-hidden="true" />

          <div className="qamat-mobile-branches">
            {mobileBranches.map((branch) => {
              const Icon = branch.icon;
              const active = branchIsActive(branch.key);

              return (
                <section
                  key={branch.key}
                  data-branch-key={branch.key}
                  className={`qamat-mobile-branch ${
                    visibleMobileBranches.has(branch.key) ? "has-revealed" : ""
                  } ${poppingMobileBranches.has(branch.key) ? "is-popping" : ""} ${
                    active ? "is-active" : ""
                  }`}
                  style={{ "--branch-tint": branch.tint } as CSSProperties}
                >
                  <div className="qamat-mobile-branch-connector" aria-hidden="true" />

                  <div className="qamat-mobile-department" aria-hidden="true">
                    <span className="qamat-mobile-department-icon">
                      <Icon aria-hidden className="size-5" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0">
                      <span className="qamat-mobile-department-name block font-semibold">
                        {branch.department.name}
                      </span>
                      <span className="qamat-mobile-department-count block text-muted-foreground">
                        {branch.department.committees.length === 1
                          ? "لجنة واحدة"
                          : `${branch.department.committees.length} لجان`}
                      </span>
                    </span>
                  </div>

                  <div
                    className={`qamat-mobile-committees qamat-mobile-committees-${branch.department.committees.length}`}
                  >
                    {branch.department.committees.map((committee, committeeIndex) => {
                      const activeCommittee = committeeIsActive(branch.key, committee.name);

                      return (
                        <button
                          key={committee.name}
                          type="button"
                          onFocus={() => setHovered(`${branch.key}::${committee.name}`)}
                          onBlur={() => setHovered(null)}
                          onClick={() => selectCommittee(branch, committee)}
                          aria-label={`اختيار ${committee.name}`}
                          aria-pressed={selectedKey === `${branch.key}::${committee.name}`}
                          className={`qamat-mobile-committee ${activeCommittee ? "is-active" : ""}`}
                          style={
                            {
                              "--dot-delay": `${committeeIndex * 0.18}s`,
                            } as CSSProperties
                          }
                        >
                          <span className="qamat-tree-committee-dot" aria-hidden="true" />
                          <span>{committee.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          ref={desktopViewportRef}
          className="qamat-tree-viewport"
          dir="ltr"
          style={{ height: `${DESKTOP_TREE_HEIGHT * treeScale}px` }}
        >
          <div
            className="qamat-tree-canvas"
            data-tree-layout="desktop"
            style={
              {
                width: `${DESKTOP_TREE_WIDTH}px`,
                height: `${DESKTOP_TREE_HEIGHT}px`,
                marginLeft: `${-DESKTOP_TREE_WIDTH / 2}px`,
                "--tree-scale": treeScale,
              } as CSSProperties
            }
          >
            <svg
              aria-hidden
              className="qamat-tree-lines"
              viewBox={`0 0 ${DESKTOP_TREE_WIDTH} ${DESKTOP_TREE_HEIGHT}`}
              preserveAspectRatio="none"
            >
              {branches.map((branch) => {
                const position = DESKTOP_TREE_POSITIONS[branch.key]!;
                const active = branchIsActive(branch.key);

                return (
                  <path
                    key={`root-${branch.key}`}
                    d={connectorPath(
                      DESKTOP_TREE_WIDTH / 2,
                      76,
                      position.department.x,
                      position.department.y - 12,
                    )}
                    className={`qamat-tree-path ${active ? "is-active" : ""}`}
                    style={{ "--path-tint": branch.tint } as CSSProperties}
                  />
                );
              })}

              {branches.flatMap((branch) => {
                const position = DESKTOP_TREE_POSITIONS[branch.key]!;

                return branch.department.committees.map((committee, index) => {
                  const target = position.committees[index]!;
                  const active = committeeIsActive(branch.key, committee.name);

                  return (
                    <path
                      key={`${branch.key}-${committee.name}`}
                      d={connectorPath(
                        position.department.x,
                        position.department.y + 32,
                        target.x,
                        target.y - 22,
                      )}
                      className={`qamat-tree-path qamat-tree-path-child ${active ? "is-active" : ""}`}
                      style={{ "--path-tint": branch.tint } as CSSProperties}
                    />
                  );
                });
              })}
            </svg>

            <div
              className="qamat-tree-root"
              dir="rtl"
              style={{ left: `${DESKTOP_TREE_WIDTH / 2}px` }}
            >
              <span className="qamat-tree-root-mark">✣</span>
              <span>فريق قامات</span>
            </div>

            {branches.map((branch) => {
              const position = DESKTOP_TREE_POSITIONS[branch.key]!;
              const Icon = branch.icon;
              const active = branchIsActive(branch.key);

              return (
                <div key={branch.key}>
                  <div
                    className={`qamat-tree-department ${active ? "is-active" : ""}`}
                    dir="rtl"
                    aria-hidden="true"
                    style={
                      {
                        left: `${position.department.x}px`,
                        top: `${position.department.y}px`,
                        "--branch-tint": branch.tint,
                      } as CSSProperties
                    }
                  >
                    <span className="qamat-tree-department-icon">
                      <Icon aria-hidden className="size-4" strokeWidth={1.7} />
                    </span>
                    <span className="min-w-0 text-center">
                      <span className="qamat-tree-department-name block font-semibold">
                        {branch.department.name}
                      </span>
                      <span className="qamat-tree-department-count block text-muted-foreground">
                        {branch.department.committees.length === 1
                          ? "لجنة واحدة"
                          : `${branch.department.committees.length} لجان`}
                      </span>
                    </span>
                  </div>

                  {branch.department.committees.map((committee, index) => {
                    const target = position.committees[index]!;
                    const activeCommittee = committeeIsActive(branch.key, committee.name);

                    return (
                      <button
                        key={committee.name}
                        type="button"
                        dir="rtl"
                        onPointerEnter={() => setHovered(`${branch.key}::${committee.name}`)}
                        onPointerLeave={() => setHovered(null)}
                        onFocus={() => setHovered(`${branch.key}::${committee.name}`)}
                        onBlur={() => setHovered(null)}
                        onClick={() => selectCommittee(branch, committee)}
                        aria-label={`اختيار ${committee.name}`}
                        aria-pressed={selectedKey === `${branch.key}::${committee.name}`}
                        className={`qamat-tree-committee ${activeCommittee ? "is-active" : ""}`}
                        style={
                          {
                            left: `${target.x}px`,
                            top: `${target.y}px`,
                            "--branch-tint": branch.tint,
                            "--dot-delay": `${index * 0.18}s`,
                          } as CSSProperties
                        }
                      >
                        <span className="qamat-tree-committee-dot" />
                        <span>{committee.name}</span>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {selection && (
        <div
          className="qamat-committee-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setSelection(null);
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="committee-dialog-title"
            className="qamat-committee-modal"
          >
            <button
              type="button"
              aria-label="إغلاق"
              onClick={() => setSelection(null)}
              className="qamat-committee-modal-close"
            >
              <X aria-hidden className="size-4" />
            </button>

            <div className="pr-1 sm:pr-2">
              <p className="text-xs font-medium text-accent-strong">{selection.department}</p>
              <h3 id="committee-dialog-title" className="mt-1 text-xl font-semibold sm:text-2xl">
                {selection.committee.name}
              </h3>
            </div>

            <div className="mt-6 rounded-2xl border border-border/70 bg-background/65 p-4 sm:p-5">
              <h4 className="text-sm font-semibold">مهام اللجنة</h4>
              <p className="mt-2 whitespace-pre-line text-sm leading-7 text-muted-foreground sm:text-[15px] sm:leading-8">
                {selection.committee.description}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onContinue(selection.department, selection.committee.name)}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground transition-all duration-300 hover:brightness-110"
            >
              اختيار هذه اللجنة والمتابعة
              <ArrowLeft aria-hidden className="size-4" />
            </button>
          </section>
        </div>
      )}
    </div>
  );
}
