"use client";
import { cn } from "../../lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

const staggerTimings = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
};

const defaultContainerVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

const defaultItemVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const defaultItemAnimationVariants = {
  fadeIn: {
    container: defaultContainerVariants,
    item: {
      hidden: { opacity: 0, y: 20 },
      show: (delay) => ({
        opacity: 1,
        y: 0,
        transition: {
          delay,
          duration: 0.3,
        },
      }),
      exit: {
        opacity: 0,
        y: 20,
        transition: { duration: 0.3 },
      },
    },
  },
  slideUp: {
    container: defaultContainerVariants,
    item: {
      hidden: { y: 20, opacity: 0 },
      show: (delay) => ({
        y: 0,
        opacity: 1,
        transition: {
          delay,
          duration: 0.3,
        },
      }),
      exit: {
        y: -20,
        opacity: 0,
        transition: { duration: 0.3 },
      },
    },
  },
};

export function TextAnimate({
  children,
  delay = 0,
  duration = 0.3,
  animation = "fadeIn",
  by = "word",
  className,
  segmentClassName,
  as: Component = "p",
  startOnView = true,
  once = true,
  ...props
}) {
  const MotionComponent = motion.create(Component);
  const [isPageActive, setIsPageActive] = useState(true);

  // Handle page visibility change
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPageActive(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const finalVariants = {
    container: {
      ...defaultItemAnimationVariants[animation].container,
      show: {
        ...defaultItemAnimationVariants[animation].container.show,
        transition: {
          staggerChildren: staggerTimings[by],
        },
      },
      exit: {
        ...defaultItemAnimationVariants[animation].container.exit,
        transition: {
          staggerChildren: staggerTimings[by],
          staggerDirection: -1,
        },
      },
    },
    item: defaultItemAnimationVariants[animation].item,
  };

  let segments = [];
  switch (by) {
    case "word":
      segments = children.split(/(\s+)/);
      break;
    case "character":
      segments = children.split("");
      break;
    case "line":
      segments = children.split("\n");
      break;
    default:
      segments = [children];
  }

  return (
    <AnimatePresence>
      {isPageActive && (
        <MotionComponent
          variants={finalVariants.container}
          initial="hidden"
          whileInView="show" // ✅ Triggers when visible
          viewport={{ once }} // ✅ Plays once unless `once=false`
          className={cn("whitespace-pre-wrap", className)}
          {...props}
        >
          {segments.map((segment, i) => (
            <motion.span
              key={`${by}-${segment}-${i}`}
              variants={finalVariants.item}
              custom={i * staggerTimings[by]}
              className={cn(by === "line" ? "block" : "inline-block whitespace-pre", segmentClassName)}
            >
              {segment}
            </motion.span>
          ))}
        </MotionComponent>
      )}
    </AnimatePresence>
  );
}
