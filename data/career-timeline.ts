export type CareerLaneId = 'chef-work' | 'software-education' | 'software-experience';
export type CareerLabelSide = 'left' | 'right';

export interface CareerTimelineLane {
  id: CareerLaneId;
  labelKey: string;
  subtitleKey?: string;
  position: number;
  start: number;
  solidEnd: number;
  futureEnd: number;
  labelSide: CareerLabelSide;
}

export interface CareerTimelineMarker {
  id: string;
  position: number;
  label?: string;
  labelKey?: string;
}

export interface CareerTimelineEvent {
  id: string;
  lane: CareerLaneId;
  position: number;
  year: string;
  titleKey: string;
  descriptionKey?: string;
  labelSide?: CareerLabelSide;
  future?: boolean;
  transitionTo?: CareerLaneId;
}

export const careerTimelineMarkers: CareerTimelineMarker[] = [
  { id: '2022', position: 8, labelKey: 'about.timeline.markers.startYear' },
  { id: '2023', position: 24, label: '2023' },
  { id: '2024', position: 40, label: '2024' },
  { id: '2025', position: 56, label: '2025' },
  { id: '2026', position: 72, labelKey: 'about.timeline.markers.year2026' },
  { id: 'future', position: 87, labelKey: 'about.timeline.markers.future' },
];

export const careerTimelineLanes: CareerTimelineLane[] = [
  {
    id: 'chef-work',
    labelKey: 'about.timeline.branches.chefWork',
    subtitleKey: 'about.timeline.branches.chefWorkContext',
    position: 17,
    start: 8,
    solidEnd: 84,
    futureEnd: 97,
    labelSide: 'right',
  },
  {
    id: 'software-education',
    labelKey: 'about.timeline.branches.developerEducation',
    position: 50,
    start: 16,
    solidEnd: 87,
    futureEnd: 97,
    labelSide: 'left',
  },
  {
    id: 'software-experience',
    labelKey: 'about.timeline.branches.developerExperience',
    position: 71,
    start: 32,
    solidEnd: 87,
    futureEnd: 97,
    labelSide: 'right',
  },
];

export const careerTimelineEvents: CareerTimelineEvent[] = [
  { id: 'restaurant-zest', lane: 'chef-work', position: 8, year: '2022', titleKey: 'about.timeline.nodes.restaurantZest' },
  {
    id: 'bootcamp-start', lane: 'chef-work', position: 16, year: '2022',
    titleKey: 'about.timeline.nodes.bootcampStart', descriptionKey: 'about.timeline.nodes.bootcampStartDescription',
    transitionTo: 'software-education',
  },
  {
    id: 'dci-bootcamp', lane: 'software-education', position: 16, year: '2022',
    titleKey: 'about.timeline.nodes.dciBootcamp', descriptionKey: 'about.timeline.nodes.dciBootcampDescription',
    labelSide: 'right',
  },
  { id: 'graduation', lane: 'software-education', position: 32, year: '2023', titleKey: 'about.timeline.nodes.graduation', transitionTo: 'software-experience' },
  {
    id: 'internship', lane: 'software-experience', position: 32, year: '2023',
    titleKey: 'about.timeline.nodes.internship', descriptionKey: 'about.timeline.nodes.internshipDescription',
  },
  {
    id: 'online-courses', lane: 'software-education', position: 40, year: '2024',
    titleKey: 'about.timeline.nodes.onlineCourses', descriptionKey: 'about.timeline.nodes.onlineCoursesDescription',
  },
  {
    id: 'personal-projects', lane: 'software-experience', position: 40, year: '2024',
    titleKey: 'about.timeline.nodes.personalProjects', descriptionKey: 'about.timeline.nodes.personalProjectsDescription',
  },
  {
    id: 'kollektiv-spinnen', lane: 'software-experience', position: 60, year: '2025',
    titleKey: 'about.timeline.nodes.kollektivSpinnen', descriptionKey: 'about.timeline.nodes.kollektivSpinnenDescription',
  },
  {
    id: 'fluent-studio', lane: 'software-experience', position: 77, year: '2026',
    titleKey: 'about.timeline.nodes.fluentStudio', descriptionKey: 'about.timeline.nodes.fluentStudioDescription',
  },
  {
    id: 'studienkolleg', lane: 'software-education', position: 80, year: '2026',
    titleKey: 'about.timeline.nodes.studienkolleg', descriptionKey: 'about.timeline.nodes.studienkollegDescription',
  },
  {
    id: 'restaurant-zest-end', lane: 'chef-work', position: 84, year: '2026',
    titleKey: 'about.timeline.nodes.restaurantZestEnd',
  },
  {
    id: 'digital-humanities', lane: 'software-education', position: 90, year: 'future',
    titleKey: 'about.timeline.futureNode.title', descriptionKey: 'about.timeline.futureNode.description', future: true,
  },
  {
    id: 'grow-fluent-studio', lane: 'software-experience', position: 88, year: 'future',
    titleKey: 'about.timeline.futureGreenNode.title', descriptionKey: 'about.timeline.futureGreenNode.description', future: true,
  },
  {
    id: 'release-product', lane: 'software-experience', position: 95, year: 'future',
    titleKey: 'about.timeline.futureProductNode.title', descriptionKey: 'about.timeline.futureProductNode.description', future: true,
  },
];
