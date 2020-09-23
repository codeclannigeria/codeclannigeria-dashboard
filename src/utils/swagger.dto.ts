/* tslint:disable */
/* eslint-disable */

/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface LoginReqDto {
  email: string;
  password: string;
}

export interface LoginResDto {
  accessToken: string;
}

export interface ApiException {
  statusCode: number;
  message: string;
  status: string;
  error: string;
  errors: object;
  timestamp: string;
  path: string;
  stack: string;
}

export interface RegisterUserDto {
  password: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface RegisterUserResDto {
  canLogin: boolean;
}

export interface AcctVerifyDto {
  clientBaseUrl: string;
  tokenParamName: string;
  emailParamName: string;
  email: string;
}

export interface ValidateTokenInput {
  token: string;
  email: string;
}

export interface ResetPassInput {
  token: string;
  email: string;
  newPassword: string;
}

export interface CreateUserDto {
  role?: "MENTEE" | "MENTOR" | "ADMIN";
  gender: "MALE" | "FEMALE" | "UNSPECIFIED";
  dob: string;
  technologies?: string[];
  photoUrl?: string;
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  city: string;
  country: string;
  phoneNumber?: string;
}

export interface TrackDto {
  updatedAt: string;
  createdAt: string;
  thumbnailUrl?: string;
  title: string;
  description: string;
  id: string;
}

export interface UserDto {
  updatedAt: string;
  createdAt: string;
  role?: "MENTEE" | "MENTOR" | "ADMIN";
  gender: "MALE" | "FEMALE" | "UNSPECIFIED";
  dob: string;
  technologies?: string[];
  photoUrl?: string;
  tracks: TrackDto[];
  firstName: string;
  lastName: string;
  email: string;
  description?: string;
  city: string;
  country: string;
  phoneNumber?: string;
  id: string;
}

export interface PagedUserOutputDto {
  items: UserDto[];
  totalCount: number;
}

export interface UpdateProfileDto {
  gender: "MALE" | "FEMALE" | "UNSPECIFIED";
  dob: string;
  technologies?: string[];
  firstName: string;
  lastName: string;
  description?: string;
  city: string;
  country: string;
  phoneNumber?: string;
}

export interface AvatarUploadDto {
  file: File;
}

export interface SubmissionDto {
  updatedAt: string;
  createdAt: string;
  menteeComment?: string;
  mentorComment?: string;
  taskUrl: string;
  gradePercentage: number;
  id: string;
}

export interface PagedListSubmissionDto {
  items: SubmissionDto[];
  totalCount: number;
}

export interface GradeSubmissionDto {
  gradePercentage: number;
  mentorComment?: string;
}

export interface CreateTrackDto {
  title: string;
  description: string;
}

export interface CreateWithThumbnailTrackDto {
  thumbnail: File;
  title: string;
  description: string;
}

export interface StageDto {
  updatedAt: string;
  createdAt: string;
  track: TrackDto & any;
  title: string;
  description: string;
  taskCount?: number;
  level: number;
  id: string;
}

export interface UserStageDto {
  updatedAt: string;
  createdAt: string;
  stage: StageDto & any;
  taskRemaining: number;
  isCompleted: boolean;
  id: string;
}

export interface PagedUserStageDto {
  items: UserStageDto[];
  totalCount: number;
}

export interface PagedListStageDto {
  items: StageDto[];
  totalCount: number;
}

export interface MentorInput {
  mentorId: string;
}

export interface PagedTrackOutputDto {
  items: TrackDto[];
  totalCount: number;
}

export interface CreateCourseDto {
  title: string;
  description: string;
  playlistUrl: string;
}

export interface CourseDto {
  updatedAt: string;
  createdAt: string;
  title: string;
  description: string;
  enrollmentCount: number;
  playlistUrl: string;
  id: string;
}

export interface PagedCourseOutputDto {
  items: CourseDto[];
  totalCount: number;
}

export interface CreateCategoryDto {
  name: string;
  description: string;
}

export interface CategoryDto {
  updatedAt: string;
  createdAt: string;
  name: string;
  description: string;
  id: string;
}

export interface PagedCategoryOutDto {
  items: CategoryDto[];
  totalCount: number;
}

export interface CreateStageDto {
  track: string;
  title: string;
  description: string;
  taskCount?: number;
  level: number;
}

export interface TaskDto {
  updatedAt: string;
  createdAt: string;
  deadline?: string;
  title: string;
  description: string;
  track: string;
  stage: string;
  course?: string;
  id: string;
}

export interface PagedListTaskDto {
  items: TaskDto[];
  totalCount: number;
}

export interface CreateTaskDto {
  deadline?: string;
  title: string;
  description: string;
  track: string;
  stage: string;
  course?: string;
}

export interface CreateSubmissionDto {
  menteeComment?: string;
  taskUrl: string;
}
