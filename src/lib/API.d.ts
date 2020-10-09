declare namespace API {
  export interface AcctVerifyDto {
    clientBaseUrl: string;
    tokenParamName: string;
    emailParamName: string;
    email: string;
  }
  export interface ApiException {
    statusCode: number;
    message: string;
    status: string;
    error: string;
    errors: {};
    timestamp: string;
    path: string;
    stack: string;
  }
  export interface AvatarUploadDto {
    file: string; // binary
  }
  export interface CategoryDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    name: string;
    description: string;
    id: string;
  }
  export interface CourseDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    title: string;
    description: string;
    readonly enrollmentCount: number;
    playlistUrl: string;
    id: string;
  }
  export interface CreateCategoryDto {
    name: string;
    description: string;
  }
  export interface CreateCourseDto {
    title: string;
    description: string;
    playlistUrl: string;
  }
  export interface CreateMentorMenteeDto {
    trackId: string;
    mentorId: string;
    menteeId: string;
  }
  export interface CreateStageDto {
    track: string;
    title: string;
    description: string;
    taskCount?: number;
    level: number;
  }
  export interface CreateSubmissionDto {
    menteeComment?: string;
    taskUrl: string;
  }
  export interface CreateTaskDto {
    deadline?: string; // date-time
    title: string;
    description: string;
    track: string;
    stage: string;
    course?: string;
  }
  export interface CreateTrackDto {
    title: string;
    description: string;
  }
  export interface CreateUserDto {
    role?: 'MENTEE' | 'MENTOR' | 'ADMIN';
    gender: 'MALE' | 'FEMALE' | 'UNSPECIFIED';
    dob: string; // date-time
    technologies?: string[];
    readonly photoUrl?: string;
    firstName: string;
    lastName: string;
    email: string;
    description?: string;
    city: string;
    country: string;
    phoneNumber?: string;
  }
  export interface CreateWithThumbnailTrackDto {
    thumbnail: string; // binary
    title: string;
    description: string;
  }
  export interface DeleteManyType {
    ids: string[];
  }
  export interface GradeSubmissionDto {
    gradePercentage: number;
    mentorComment?: string;
  }
  export interface LoginReqDto {
    email: string;
    password: string;
  }
  export interface LoginResDto {
    accessToken: string;
  }
  export interface MentorInput {
    mentorId: string;
  }
  export interface MentorMenteeDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    mentor: SimpleUserDto;
    mentee: SimpleUserDto;
    track: SimpleTrackDto;
    id: string;
  }
  export interface PagedCategoryOutDto {
    items: CategoryDto[];
    totalCount: number;
  }
  export interface PagedCourseOutputDto {
    items: CourseDto[];
    totalCount: number;
  }
  export interface PagedListStageDto {
    items: StageDto[];
    totalCount: number;
  }
  export interface PagedListSubmissionDto {
    items: SubmissionDto[];
    totalCount: number;
  }
  export interface PagedListTaskDto {
    items: TaskDto[];
    totalCount: number;
  }
  export interface PagedMentorMenteeDto {
    items: MentorMenteeDto[];
    totalCount: number;
  }
  export interface PagedTrackOutputDto {
    items: TrackDto[];
    totalCount: number;
  }
  export interface PagedUserOutputDto {
    items: UserDto[];
    totalCount: number;
  }
  export interface PagedUserStageDto {
    items: UserStageDto[];
    totalCount: number;
  }
  export interface ReassignMenteeInput {
    menteeId: string;
    fromMentorId?: string;
    toMentorId: string;
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
  export interface ResetPassInput {
    token: string;
    email: string;
    newPassword: string;
  }
  export interface SimpleTaskDto {
    title: string;
    id: string;
  }
  export interface SimpleTrackDto {
    title: string;
    id: string;
  }
  export interface SimpleUserDto {
    firstName: string;
    lastName: string;
    id: string;
  }
  export interface StageDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    readonly track: {
      updatedAt: string; // date-time
      createdAt: string; // date-time
      readonly thumbnailUrl?: string;
      title: string;
      description: string;
      id: string;
    };
    title: string;
    description: string;
    taskCount?: number;
    level: number;
    id: string;
  }
  export interface SubmissionDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    menteeComment?: string;
    mentorComment?: string;
    taskUrl: string;
    gradePercentage: number;
    mentor: SimpleUserDto;
    mentee: SimpleUserDto;
    task: SimpleTaskDto;
    id: string;
  }
  export interface TaskDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    deadline?: string; // date-time
    title: string;
    description: string;
    track: string;
    stage: string;
    course?: string;
    id: string;
  }
  export interface TrackDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    readonly thumbnailUrl?: string;
    title: string;
    description: string;
    id: string;
  }
  export interface UpdateProfileDto {
    gender: 'MALE' | 'FEMALE' | 'UNSPECIFIED';
    dob: string; // date-time
    technologies?: string[];
    firstName: string;
    lastName: string;
    description?: string;
    city: string;
    country: string;
    phoneNumber?: string;
  }
  export interface UserDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    role?: 'MENTEE' | 'MENTOR' | 'ADMIN';
    gender: 'MALE' | 'FEMALE' | 'UNSPECIFIED';
    dob: string; // date-time
    technologies?: string[];
    readonly photoUrl?: string;
    readonly notifyCount: number;
    readonly notifUnreadCount: number;
    readonly tracks: TrackDto[];
    firstName: string;
    lastName: string;
    email: string;
    description?: string;
    city: string;
    country: string;
    phoneNumber?: string;
    id: string;
  }
  export interface UserStageDto {
    updatedAt: string; // date-time
    createdAt: string; // date-time
    readonly stage: {
      updatedAt: string; // date-time
      createdAt: string; // date-time
      readonly track: {
        updatedAt: string; // date-time
        createdAt: string; // date-time
        readonly thumbnailUrl?: string;
        title: string;
        description: string;
        id: string;
      };
      title: string;
      description: string;
      taskCount?: number;
      level: number;
      id: string;
    };
    taskRemaining: number;
    isCompleted: boolean;
    id: string;
  }
  export interface ValidateTokenInput {
    token: string;
    email: string;
  }
}
