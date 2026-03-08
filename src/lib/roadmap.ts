export type RoadmapItemStatus = "complete" | "in-progress" | "planned";

export type RoadmapItem = {
  title: string;
  status: RoadmapItemStatus;
};

export type RoadmapSection = {
  title: string;
  description: string;
  items: RoadmapItem[];
};

export const ROADMAP_SECTIONS: RoadmapSection[] = [
  {
    title: "Now",
    description: "What exists today: stable CLI, editor support, and core diff engine.",
    items: [
      { title: "CLI stable", status: "complete" },
      { title: "VSCode extension", status: "complete" },
      { title: "Schema diff engine", status: "complete" },
    ],
  },
  {
    title: "Next",
    description: "Currently being built or planned next.",
    items: [
      { title: "Interactive playground", status: "in-progress" },
      { title: "GitHub Action", status: "in-progress" },
      { title: "Visual diff API", status: "planned" },
    ],
  },
  {
    title: "Future",
    description: "Long-term vision and exploratory ideas.",
    items: [
      { title: "Multi-provider support", status: "planned" },
      { title: "Schema visualization", status: "planned" },
      { title: "Schema Forge Cloud", status: "planned" },
    ],
  },
];
