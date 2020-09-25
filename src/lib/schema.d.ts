declare namespace DTO {
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
        errors: unknown;
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
        role?: "MENTEE" | "MENTOR" | "ADMIN";
        gender: "MALE" | "FEMALE" | "UNSPECIFIED";
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
        gender: "MALE" | "FEMALE" | "UNSPECIFIED";
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
        role?: "MENTEE" | "MENTOR" | "ADMIN";
        gender: "MALE" | "FEMALE" | "UNSPECIFIED";
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
            track: any;
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
declare namespace Paths {
    namespace AppControllerGetHello {
        namespace Responses {
            export type $200 = string;
        }
    }
    namespace AuthControllerLogin {
        export type RequestBody = DTO.LoginReqDto;
        namespace Responses {
            export type $200 = DTO.LoginResDto;
            export type $401 = DTO.ApiException;
        }
    }
    namespace AuthControllerRegister {
        export type RequestBody = DTO.RegisterUserDto;
        namespace Responses {
            export type $201 = DTO.RegisterUserResDto;
            export type $409 = DTO.ApiException;
        }
    }
    namespace AuthControllerResetPassword {
        export type RequestBody = DTO.ResetPassInput;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerSendEmailVerifyToken {
        export type RequestBody = DTO.AcctVerifyDto;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerSendForgotPwToken {
        export type RequestBody = DTO.AcctVerifyDto;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace AuthControllerVerifyEmailToken {
        export type RequestBody = DTO.ValidateTokenInput;
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace BaseDelete {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace BaseFindAll {
        namespace Parameters {
            export type Limit = number;
            export type Opts = string;
            export type Search = string;
            export type Skip = number;
        }
        export interface QueryParameters {
            skip?: Parameters.Skip;
            limit?: Parameters.Limit;
            search?: Parameters.Search;
            opts?: Parameters.Opts;
        }
        namespace Responses {
            export type $200 = DTO.PagedUserOutputDto;
        }
    }
    namespace BaseFindById {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = DTO.UserDto;
            export type $404 = DTO.ApiException;
        }
    }
    namespace BaseUpdate {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        export type RequestBody = DTO.CreateUserDto;
        namespace Responses {
            export type $200 = DTO.UserDto;
            export type $400 = DTO.ApiException;
            export type $404 = DTO.ApiException;
        }
    }
    namespace CategoriesControllerCreate {
        export type RequestBody = DTO.CreateCategoryDto;
        namespace Responses {
            export type $201 = DTO.CategoryDto;
            export type $400 = DTO.ApiException;
            export type $403 = DTO.ApiException;
        }
    }
    namespace CoursesControllerCreate {
        export type RequestBody = DTO.CreateCourseDto;
        namespace Responses {
            export type $201 = DTO.CourseDto;
            export type $400 = DTO.ApiException;
            export type $403 = DTO.ApiException;
        }
    }
    namespace MentorControllerGetSubmissions {
        namespace Parameters {
            export type Limit = number;
            export type Opts = string;
            export type Search = string;
            export type Skip = number;
        }
        export interface QueryParameters {
            skip?: Parameters.Skip;
            limit?: Parameters.Limit;
            search?: Parameters.Search;
            opts?: Parameters.Opts;
        }
        namespace Responses {
            export type $200 = DTO.PagedListSubmissionDto;
            export type $400 = DTO.ApiException;
        }
    }
    namespace MentorControllerGradeTask {
        namespace Parameters {
            export type SubmissionId = string;
        }
        export interface PathParameters {
            submissionId: Parameters.SubmissionId;
        }
        export type RequestBody = DTO.GradeSubmissionDto;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = DTO.ApiException;
        }
    }
    namespace ProfileControllerGetMentees {
        namespace Parameters {
            export type Limit = number;
            export type Opts = string;
            export type Search = string;
            export type Skip = number;
        }
        export interface QueryParameters {
            skip?: Parameters.Skip;
            limit?: Parameters.Limit;
            search?: Parameters.Search;
            opts?: Parameters.Opts;
        }
        namespace Responses {
            export type $200 = DTO.PagedUserOutputDto;
        }
    }
    namespace ProfileControllerGetMentors {
        namespace Parameters {
            export type Limit = number;
            export type Opts = string;
            export type Search = string;
            export type Skip = number;
        }
        export interface QueryParameters {
            skip?: Parameters.Skip;
            limit?: Parameters.Limit;
            search?: Parameters.Search;
            opts?: Parameters.Opts;
        }
        namespace Responses {
            export type $200 = DTO.PagedUserOutputDto;
        }
    }
    namespace ProfileControllerGetProfile {
        namespace Responses {
            export type $200 = DTO.UserDto;
        }
    }
    namespace ProfileControllerUpdateProfile {
        export type RequestBody = DTO.UpdateProfileDto;
        namespace Responses {
            export type $200 = DTO.UserDto;
        }
    }
    namespace ProfileControllerUploadFile {
        namespace Responses {
            export type $200 = DTO.UserDto;
        }
    }
    namespace StagesControllerCreate {
        export type RequestBody = DTO.CreateStageDto;
        namespace Responses {
            export type $201 = DTO.StageDto;
            export type $400 = DTO.ApiException;
            export type $403 = DTO.ApiException;
        }
    }
    namespace StagesControllerGetStages {
        namespace Parameters {
            export type Limit = number;
            export type Opts = string;
            export type Search = string;
            export type Skip = number;
            export type StageId = string;
        }
        export interface PathParameters {
            stageId: Parameters.StageId;
        }
        export interface QueryParameters {
            skip?: Parameters.Skip;
            limit?: Parameters.Limit;
            search?: Parameters.Search;
            opts?: Parameters.Opts;
        }
        namespace Responses {
            export type $200 = DTO.PagedListTaskDto;
            export type $400 = DTO.ApiException;
        }
    }
    namespace TasksControllerCreate {
        export type RequestBody = DTO.CreateTaskDto;
        namespace Responses {
            export type $201 = DTO.TaskDto;
            export type $400 = DTO.ApiException;
        }
    }
    namespace TasksControllerGetMentors {
        namespace Parameters {
            export type TaskId = string;
        }
        export interface PathParameters {
            taskId: Parameters.TaskId;
        }
        namespace Responses {
            export type $200 = DTO.PagedListSubmissionDto;
            export type $400 = DTO.ApiException;
        }
    }
    namespace TasksControllerSubmitTask {
        namespace Parameters {
            export type TaskId = string;
        }
        export interface PathParameters {
            taskId: Parameters.TaskId;
        }
        export type RequestBody = DTO.CreateSubmissionDto;
        namespace Responses {
            export type $201 = DTO.SubmissionDto;
            export type $400 = DTO.ApiException;
            export type Undefined = DTO.SubmissionDto;
        }
    }
    namespace TracksControllerCreate {
        export type RequestBody = DTO.CreateTrackDto;
        namespace Responses {
            export type $201 = DTO.TrackDto;
            export type $400 = DTO.ApiException;
            export interface $403 {
            }
        }
    }
    namespace TracksControllerCreateMentors {
        namespace Parameters {
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: Parameters.TrackId;
        }
        export type RequestBody = DTO.MentorInput;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = DTO.ApiException;
        }
    }
    namespace TracksControllerCreateTrack {
        namespace Responses {
            export type $201 = DTO.TrackDto;
            export type $403 = DTO.ApiException;
        }
    }
    namespace TracksControllerEnroll {
        namespace Parameters {
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: Parameters.TrackId;
        }
        export type RequestBody = DTO.MentorInput;
        namespace Responses {
            export interface $200 {
            }
            export type $400 = DTO.ApiException;
        }
    }
    namespace TracksControllerGetMentors {
        namespace Parameters {
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: Parameters.TrackId;
        }
        namespace Responses {
            export type $200 = DTO.PagedUserOutputDto;
            export type $400 = DTO.ApiException;
        }
    }
    namespace TracksControllerGetMyStages {
        namespace Parameters {
            export type Limit = number;
            export type Opts = string;
            export type Search = string;
            export type Skip = number;
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: Parameters.TrackId;
        }
        export interface QueryParameters {
            skip?: Parameters.Skip;
            limit?: Parameters.Limit;
            search?: Parameters.Search;
            opts?: Parameters.Opts;
        }
        namespace Responses {
            export type $200 = DTO.PagedUserStageDto;
        }
    }
    namespace TracksControllerGetStages {
        namespace Parameters {
            export type TrackId = string;
        }
        export interface PathParameters {
            trackId: Parameters.TrackId;
        }
        namespace Responses {
            export type $200 = DTO.PagedListStageDto;
            export type $400 = DTO.ApiException;
        }
    }
    namespace UsersControllerCreate {
        export type RequestBody = DTO.CreateUserDto;
        namespace Responses {
            export type $201 = DTO.UserDto;
            export type $400 = DTO.ApiException;
            export type $403 = DTO.ApiException;
        }
    }
}
