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

import { exists } from "../runtime";
import { QueryState, QueryStateFromJSON, QueryStateToJSON } from "./";

/**
 *
 * @export
 * @interface Query
 */
export interface Query {
  /**
   *
   * @type {number}
   * @memberof Query
   */
  readonly id?: number;
  /**
   *
   * @type {boolean}
   * @memberof Query
   */
  allowEditReply?: boolean;
  /**
   *
   * @type {Date}
   * @memberof Query
   */
  closes?: Date;
  /**
   *
   * @type {QueryState}
   * @memberof Query
   */
  state?: QueryState;
  /**
   *
   * @type {string}
   * @memberof Query
   */
  name?: string;
  /**
   *
   * @type {string}
   * @memberof Query
   */
  urlName?: string;
  /**
   *
   * @type {boolean}
   * @memberof Query
   */
  visible?: boolean;
  /**
   *
   * @type {string}
   * @memberof Query
   */
  description?: string;
  /**
   * Comment\'s creator id
   * @type {string}
   * @memberof Query
   */
  readonly creatorId?: string;
  /**
   * Comment\'s last modifier id
   * @type {string}
   * @memberof Query
   */
  readonly lastModifierId?: string;
  /**
   * Comment\'s creation time
   * @type {Date}
   * @memberof Query
   */
  readonly created?: Date;
  /**
   * Comment\'s last modification time
   * @type {Date}
   * @memberof Query
   */
  readonly lastModified?: Date;
}

export function QueryFromJSON(json: any): Query {
  return QueryFromJSONTyped(json, false);
}

export function QueryFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean
): Query {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    allowEditReply: !exists(json, "allowEditReply")
      ? undefined
      : json["allowEditReply"],
    closes: !exists(json, "closes") ? undefined : new Date(json["closes"]),
    state: !exists(json, "state")
      ? undefined
      : QueryStateFromJSON(json["state"]),
    name: !exists(json, "name") ? undefined : json["name"],
    urlName: !exists(json, "urlName") ? undefined : json["urlName"],
    visible: !exists(json, "visible") ? undefined : json["visible"],
    description: !exists(json, "description") ? undefined : json["description"],
    creatorId: !exists(json, "creatorId") ? undefined : json["creatorId"],
    lastModifierId: !exists(json, "lastModifierId")
      ? undefined
      : json["lastModifierId"],
    created: !exists(json, "created") ? undefined : new Date(json["created"]),
    lastModified: !exists(json, "lastModified")
      ? undefined
      : new Date(json["lastModified"])
  };
}

export function QueryToJSON(value?: Query | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    allowEditReply: value.allowEditReply,
    closes: value.closes === undefined ? undefined : value.closes.toISOString(),
    state: QueryStateToJSON(value.state),
    name: value.name,
    urlName: value.urlName,
    visible: value.visible,
    description: value.description
  };
}
