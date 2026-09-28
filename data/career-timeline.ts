export type CareerLaneId = 'chef-work' | 'software-education' | 'software-experience';

export interface CareerTimelineLane {
  id: CareerLaneId;
  labelKey: string;
  start: number;
  currentEnd: number;
}

export interface CareerTimelineEvent {
  id: string;
  lane: CareerLaneId;
  position: number;
  titleKey: string;
  descriptionKey?: string;
  future?: boolean;
  transitionTo?: CareerLaneId;
}

export const careerTimelineLanes: CareerTimelineLane[] = [
  {
    id: 'chef-work',
    labelKey: 'about.timeline.branches.chefWork',
    start: 8,
    currentEnd: 24,
  },
  {
    id: 'software-education',
    labelKey: 'about.timeline.branches.developerEducation',
    start: 24,
    currentEnd: 77,
  },
  {
    id: 'software-experience',
    labelKey: 'about.timeline.branches.developerExperience',
    start: 39,
    currentEnd: 77,
  },
];

export const careerTimelineEvents: CareerTimelineEvent[] = [
  {
    id: 'restaurant-zest',
    lane: 'chef-work',
    position: 13,
    titleKey: 'about.timeline.nodes.restaurantZest',
  },
  {
    id: 'bootcamp-start',
    lane: 'chef-work',
    position: 24,
    titleKey: 'about.timeline.nodes.bootcampStart',
    descriptionKey: 'about.timeline.nodes.bootcampStartDescription',
    transitionTo: 'software-education',
  },
  {
    id: 'dci-bootcamp',
    lane: 'software-education',
    position: 31,
    titleKey: 'about.timeline.nodes.dciBootcamp',
    descriptionKey: 'about.timeline.nodes.dciBootcampDescription',
  },
  {
    id: 'graduation',
    lane: 'software-education',
    position: 39,
    titleKey: 'about.timeline.nodes.graduation',
    transitionTo: 'software-experience',
  },
  {
    id: 'internship',
    lane: 'software-experience',
    position: 46,
    titleKey: 'about.timeline.nodes.internship',
    descriptionKey: 'about.timeline.nodes.internshipDescription',
  },
  {
    id: 'online-courses',
    lane: 'software-education',
    position: 50,
    titleKey: 'about.timeline.nodes.onlineCourses',
    descriptionKey: 'about.timeline.nodes.onlineCoursesDescription',
  },
  {
    id: 'personal-projects',
    lane: 'software-experience',
    position: 57,
    titleKey: 'about.timeline.nodes.personalProjects',
    descriptionKey: 'about.timeline.nodes.personalProjectsDescription',
  },
  {
    id: 'kollektiv-spinnen',
    lane: 'software-experience',
    position: 66,
    titleKey: 'about.timeline.nodes.kollektivSpinnen',
    descriptionKey: 'about.timeline.nodes.kollektivSpinnenDescription',
  },
  {
    id: 'studienkolleg',
    lane: 'software-education',
    position: 72,
    titleKey: 'about.timeline.nodes.studienkolleg',
    descriptionKey: 'about.timeline.nodes.studienkollegDescription',
  },
  {
    id: 'fluent-studio',
    lane: 'software-experience',
    position: 77,
    titleKey: 'about.timeline.nodes.fluentStudio',
    descriptionKey: 'about.timeline.nodes.fluentStudioDescription',
  },
  {
    id: 'digital-humanities',
    lane: 'software-education',
    position: 84,
    titleKey: 'about.timeline.futureNode.title',
    descriptionKey: 'about.timeline.futureNode.description',
    future: true,
  },
  {
    id: 'grow-fluent-studio',
    lane: 'software-experience',
    position: 92,
    titleKey: 'about.timeline.futureGreenNode.title',
    descriptionKey: 'about.timeline.futureGreenNode.description',
    future: true,
  },
  {
    id: 'release-product',
    lane: 'software-experience',
    position: 97,
    titleKey: 'about.timeline.futureProductNode.title',
    descriptionKey: 'about.timeline.futureProductNode.description',
    future: true,
  },
];
