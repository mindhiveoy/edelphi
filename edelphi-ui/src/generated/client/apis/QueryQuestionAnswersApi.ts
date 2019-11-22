// tslint:disable
// eslint-disable
/**
 * eDelphi REST API
 * REST API for eDelphi
 *
 * The version of the OpenAPI document: 1.0.1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import * as runtime from "../runtime";
import {
  QueryQuestionAnswerLive2d,
  QueryQuestionAnswerLive2dFromJSON,
  QueryQuestionAnswerLive2dToJSON
} from "../models";

export interface DeleteQueryQuestionAnswersRequest {
  panelId: number;
  queryId?: number;
  queryPageId?: number;
  querySectionId?: number;
}

export interface FindQueryQuestionAnswerLive2dRequest {
  panelId: number;
  answerId: string;
}

export interface ListQueryQuestionAnswersLive2dRequest {
  panelId: number;
  queryId?: number;
  pageId?: number;
  userId?: string;
  stampId?: number;
}

export interface UpsertQueryQuestionAnswerLive2dRequest {
  queryQuestionAnswerLive2d: QueryQuestionAnswerLive2d;
  panelId: number;
  answerId: string;
}

/**
 * no description
 */
export class QueryQuestionAnswersApi extends runtime.BaseAPI {
  /**
   * Deletes query question answers
   * Delete query question answers
   */
  async deleteQueryQuestionAnswersRaw(
    requestParameters: DeleteQueryQuestionAnswersRequest
  ): Promise<runtime.ApiResponse<void>> {
    if (
      requestParameters.panelId === null ||
      requestParameters.panelId === undefined
    ) {
      throw new runtime.RequiredError(
        "panelId",
        "Required parameter requestParameters.panelId was null or undefined when calling deleteQueryQuestionAnswers."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.queryId !== undefined) {
      queryParameters["queryId"] = requestParameters.queryId;
    }

    if (requestParameters.queryPageId !== undefined) {
      queryParameters["queryPageId"] = requestParameters.queryPageId;
    }

    if (requestParameters.querySectionId !== undefined) {
      queryParameters["querySectionId"] = requestParameters.querySectionId;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] = this.configuration.apiKey(
        "Authorization"
      ); // bearer authentication
    }

    const response = await this.request({
      path: `/panels/{panelId}/queryQuestionAnswers`.replace(
        `{${"panelId"}}`,
        encodeURIComponent(String(requestParameters.panelId))
      ),
      method: "DELETE",
      headers: headerParameters,
      query: queryParameters
    });

    return new runtime.VoidApiResponse(response);
  }

  /**
   * Deletes query question answers
   * Delete query question answers
   */
  async deleteQueryQuestionAnswers(
    requestParameters: DeleteQueryQuestionAnswersRequest
  ): Promise<void> {
    await this.deleteQueryQuestionAnswersRaw(requestParameters);
  }

  /**
   * Finds query question answer by id
   * Find query question answer.
   */
  async findQueryQuestionAnswerLive2dRaw(
    requestParameters: FindQueryQuestionAnswerLive2dRequest
  ): Promise<runtime.ApiResponse<QueryQuestionAnswerLive2d>> {
    if (
      requestParameters.panelId === null ||
      requestParameters.panelId === undefined
    ) {
      throw new runtime.RequiredError(
        "panelId",
        "Required parameter requestParameters.panelId was null or undefined when calling findQueryQuestionAnswerLive2d."
      );
    }

    if (
      requestParameters.answerId === null ||
      requestParameters.answerId === undefined
    ) {
      throw new runtime.RequiredError(
        "answerId",
        "Required parameter requestParameters.answerId was null or undefined when calling findQueryQuestionAnswerLive2d."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] = this.configuration.apiKey(
        "Authorization"
      ); // bearer authentication
    }

    const response = await this.request({
      path: `/panels/{panelId}/live2dQueryQuestionAnswers/{answerId}`
        .replace(
          `{${"panelId"}}`,
          encodeURIComponent(String(requestParameters.panelId))
        )
        .replace(
          `{${"answerId"}}`,
          encodeURIComponent(String(requestParameters.answerId))
        ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      QueryQuestionAnswerLive2dFromJSON(jsonValue)
    );
  }

  /**
   * Finds query question answer by id
   * Find query question answer.
   */
  async findQueryQuestionAnswerLive2d(
    requestParameters: FindQueryQuestionAnswerLive2dRequest
  ): Promise<QueryQuestionAnswerLive2d> {
    const response = await this.findQueryQuestionAnswerLive2dRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Lists query question live2d answers
   * Lists query question live2d answers
   */
  async listQueryQuestionAnswersLive2dRaw(
    requestParameters: ListQueryQuestionAnswersLive2dRequest
  ): Promise<runtime.ApiResponse<Array<QueryQuestionAnswerLive2d>>> {
    if (
      requestParameters.panelId === null ||
      requestParameters.panelId === undefined
    ) {
      throw new runtime.RequiredError(
        "panelId",
        "Required parameter requestParameters.panelId was null or undefined when calling listQueryQuestionAnswersLive2d."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    if (requestParameters.queryId !== undefined) {
      queryParameters["queryId"] = requestParameters.queryId;
    }

    if (requestParameters.pageId !== undefined) {
      queryParameters["pageId"] = requestParameters.pageId;
    }

    if (requestParameters.userId !== undefined) {
      queryParameters["userId"] = requestParameters.userId;
    }

    if (requestParameters.stampId !== undefined) {
      queryParameters["stampId"] = requestParameters.stampId;
    }

    const headerParameters: runtime.HTTPHeaders = {};

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] = this.configuration.apiKey(
        "Authorization"
      ); // bearer authentication
    }

    const response = await this.request({
      path: `/panels/{panelId}/live2dQueryQuestionAnswers`.replace(
        `{${"panelId"}}`,
        encodeURIComponent(String(requestParameters.panelId))
      ),
      method: "GET",
      headers: headerParameters,
      query: queryParameters
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      jsonValue.map(QueryQuestionAnswerLive2dFromJSON)
    );
  }

  /**
   * Lists query question live2d answers
   * Lists query question live2d answers
   */
  async listQueryQuestionAnswersLive2d(
    requestParameters: ListQueryQuestionAnswersLive2dRequest
  ): Promise<Array<QueryQuestionAnswerLive2d>> {
    const response = await this.listQueryQuestionAnswersLive2dRaw(
      requestParameters
    );
    return await response.value();
  }

  /**
   * Creates or updates query question answer
   * Creates or updates query question answer
   */
  async upsertQueryQuestionAnswerLive2dRaw(
    requestParameters: UpsertQueryQuestionAnswerLive2dRequest
  ): Promise<runtime.ApiResponse<QueryQuestionAnswerLive2d>> {
    if (
      requestParameters.queryQuestionAnswerLive2d === null ||
      requestParameters.queryQuestionAnswerLive2d === undefined
    ) {
      throw new runtime.RequiredError(
        "queryQuestionAnswerLive2d",
        "Required parameter requestParameters.queryQuestionAnswerLive2d was null or undefined when calling upsertQueryQuestionAnswerLive2d."
      );
    }

    if (
      requestParameters.panelId === null ||
      requestParameters.panelId === undefined
    ) {
      throw new runtime.RequiredError(
        "panelId",
        "Required parameter requestParameters.panelId was null or undefined when calling upsertQueryQuestionAnswerLive2d."
      );
    }

    if (
      requestParameters.answerId === null ||
      requestParameters.answerId === undefined
    ) {
      throw new runtime.RequiredError(
        "answerId",
        "Required parameter requestParameters.answerId was null or undefined when calling upsertQueryQuestionAnswerLive2d."
      );
    }

    const queryParameters: runtime.HTTPQuery = {};

    const headerParameters: runtime.HTTPHeaders = {};

    headerParameters["Content-Type"] = "application/json";

    if (this.configuration && this.configuration.apiKey) {
      headerParameters["Authorization"] = this.configuration.apiKey(
        "Authorization"
      ); // bearer authentication
    }

    const response = await this.request({
      path: `/panels/{panelId}/live2dQueryQuestionAnswers/{answerId}`
        .replace(
          `{${"panelId"}}`,
          encodeURIComponent(String(requestParameters.panelId))
        )
        .replace(
          `{${"answerId"}}`,
          encodeURIComponent(String(requestParameters.answerId))
        ),
      method: "PUT",
      headers: headerParameters,
      query: queryParameters,
      body: QueryQuestionAnswerLive2dToJSON(
        requestParameters.queryQuestionAnswerLive2d
      )
    });

    return new runtime.JSONApiResponse(response, jsonValue =>
      QueryQuestionAnswerLive2dFromJSON(jsonValue)
    );
  }

  /**
   * Creates or updates query question answer
   * Creates or updates query question answer
   */
  async upsertQueryQuestionAnswerLive2d(
    requestParameters: UpsertQueryQuestionAnswerLive2dRequest
  ): Promise<QueryQuestionAnswerLive2d> {
    const response = await this.upsertQueryQuestionAnswerLive2dRaw(
      requestParameters
    );
    return await response.value();
  }
}
