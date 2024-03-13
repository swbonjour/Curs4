/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SigninUserDto {
  username: string;
  password: string;
}

export interface AuthResponseDto {
  userId: string;
  access_token: string;
}

export type User = object;

export type Group = object;

export interface CreateGroupDto {
  name: string;
  owner: string;
}

export interface AddUserToGroup {
  user_id: string;
  group_id: string;
}

export type Quiz = object;

export interface AddQuizDto {
  group: string;
  question: string;
  answers: string[];
  correct_answer: string;
  score: number;
  user_id: string;
}

export interface QuizAnswerDto {
  id: string;
  user_id: string;
}

export interface AuthControllerLoginParams {
  username: string;
  password: string;
}

export interface AuthControllerWhoAmIParams {
  jwt: string;
}

export interface UserControllerGetUsersByIdParams {
  _id: string;
}

export interface UserControllerGetUsersNotInSpaceParams {
  group_id: string;
}

export interface GroupControllerGetGroupsParams {
  user_id: string;
  owner: string;
}

export interface GroupControllerDeleteGroupParams {
  _id: string;
}

export interface GroupControllerGetAllowedUsersParams {
  group_id: string;
}

export interface GroupControllerDeleteUserFromGroupParams {
  group_id: string;
  user_id: string;
}

export interface QuizControllerGetQuestionsForGroupParams {
  group: string;
}

export interface QuizControllerDeleteQuestionFromGroupParams {
  id: string;
}

import type { AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<T> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance
      .request({
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
        },
        params: query,
        responseType: responseFormat,
        data: body,
        url: path,
      })
      .then((response) => response.data);
  };
}

/**
 * @title Lang API
 * @version 1.0
 * @contact
 *
 * Lang API description
 */
export class LangApi<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @name AuthControllerSignIn
     * @request POST:/api/v1/auth/signin
     */
    authControllerSignIn: (data: SigninUserDto, params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/api/v1/auth/signin`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AuthControllerLogin
     * @request GET:/api/v1/auth/login
     */
    authControllerLogin: (query: AuthControllerLoginParams, params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/api/v1/auth/login`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name AuthControllerWhoAmI
     * @request GET:/api/v1/auth/who-am-i
     */
    authControllerWhoAmI: (query: AuthControllerWhoAmIParams, params: RequestParams = {}) =>
      this.request<AuthResponseDto, any>({
        path: `/api/v1/auth/who-am-i`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUserById
     * @request GET:/api/v1/user/get-by-id/{_id}
     */
    userControllerGetUserById: (id: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/user/get-by-id/${id}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUsersById
     * @request GET:/api/v1/user/users
     */
    userControllerGetUsersById: (query: UserControllerGetUsersByIdParams, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/user/users`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name UserControllerGetUsersNotInSpace
     * @request GET:/api/v1/user/group
     */
    userControllerGetUsersNotInSpace: (query: UserControllerGetUsersNotInSpaceParams, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/user/group`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupControllerGetGroups
     * @request GET:/api/v1/group
     */
    groupControllerGetGroups: (query: GroupControllerGetGroupsParams, params: RequestParams = {}) =>
      this.request<Group[], any>({
        path: `/api/v1/group`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupControllerCreateGroup
     * @request POST:/api/v1/group/create
     */
    groupControllerCreateGroup: (data: CreateGroupDto, params: RequestParams = {}) =>
      this.request<Group, any>({
        path: `/api/v1/group/create`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupControllerAddUserToGroup
     * @request POST:/api/v1/group/add-user
     */
    groupControllerAddUserToGroup: (data: AddUserToGroup, params: RequestParams = {}) =>
      this.request<Group, any>({
        path: `/api/v1/group/add-user`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupControllerDeleteGroup
     * @request DELETE:/api/v1/group/delete
     */
    groupControllerDeleteGroup: (query: GroupControllerDeleteGroupParams, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/group/delete`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupControllerGetAllowedUsers
     * @request GET:/api/v1/group/allowed
     */
    groupControllerGetAllowedUsers: (query: GroupControllerGetAllowedUsersParams, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/group/allowed`,
        method: 'GET',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @name GroupControllerDeleteUserFromGroup
     * @request DELETE:/api/v1/group/delete-user
     */
    groupControllerDeleteUserFromGroup: (query: GroupControllerDeleteUserFromGroupParams, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/group/delete-user`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @name QuizControllerGetQuestionsForGroup
     * @request GET:/api/v1/quiz
     */
    quizControllerGetQuestionsForGroup: (query: QuizControllerGetQuestionsForGroupParams, params: RequestParams = {}) =>
      this.request<Quiz[], any>({
        path: `/api/v1/quiz`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name QuizControllerAddQuestionToGroup
     * @request POST:/api/v1/quiz/add
     */
    quizControllerAddQuestionToGroup: (data: AddQuizDto, params: RequestParams = {}) =>
      this.request<Quiz, any>({
        path: `/api/v1/quiz/add`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @name QuizControllerDeleteQuestionFromGroup
     * @request DELETE:/api/v1/quiz/delete
     */
    quizControllerDeleteQuestionFromGroup: (
      query: QuizControllerDeleteQuestionFromGroupParams,
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/api/v1/quiz/delete`,
        method: 'DELETE',
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @name QuizControllerSendCorrectAnswer
     * @request PUT:/api/v1/quiz/answer
     */
    quizControllerSendCorrectAnswer: (data: QuizAnswerDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/quiz/answer`,
        method: 'PUT',
        body: data,
        type: ContentType.Json,
        ...params,
      }),
  };
}
