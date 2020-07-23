import { BaseResource } from './base-resource';
import { getResourceHttpService } from '../service/resource-http.service';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

/**
 * Main Resource class.
 *
 * Should be extended by client model classes that represent regular entity objects.
 *
 * A distinctive feature of such resources is that they have <b>self</b> link while {@link EmbeddedResource} hasn't.
 */
export class Resource extends BaseResource {

  /**
   * Adds the given resource to the bind resource collection by the relation name.
   *
   * @param relationName that contains link to the resource collection
   * @param resource that should be added to the collection
   */
  public addRelation<T extends Resource>(relationName: string, resource: T): Observable<HttpResponse<any>> {
    const relationLink = this.getRelationLink(relationName);

    return getResourceHttpService().postResource(relationLink.href, resource.getSelfLinkHref(), {
      observe: 'response',
      headers: new HttpHeaders({'Content-Type': 'text/uri-list'})
    });
  }

  /**
   * Bind the given resource to this resource by the given relation name.
   *
   * @param relationName that contains link to the suitable resource type
   * @param resource that should be bind
   */
  public bindRelation<T extends Resource>(relationName: string, resource: T): Observable<HttpResponse<any>> {
    const relationLink = this.getRelationLink(relationName);

    return getResourceHttpService().putResource(relationLink.href, resource.getSelfLinkHref(), {
      observe: 'response',
      headers: new HttpHeaders({'Content-Type': 'text/uri-list'})
    });
  }

  /**
   * Unbind all resources by relation name.
   *
   * For resource collection means that all resources will be unbind and resource collection will be empty.
   *
   * @param relationName that contains link to the resource collection or resource
   */
  public clearRelation<T extends Resource>(relationName: string): Observable<HttpResponse<any>> {
    const relationLink = this.getRelationLink(relationName);
    return getResourceHttpService().putResource(relationLink.href, '', {
      observe: 'response',
      headers: new HttpHeaders({'Content-Type': 'text/uri-list'})
    });
  }


  /**
   * Unbind the single resource with the given relation name from this resource.
   *
   * For resource collection means that only passed resource will be unbind from collection.
   *
   * @param relationName that contains link to the resource collection or resource
   * @param resource that should be unbind
   */
  public deleteRelation<T extends Resource>(relationName: string, resource: T): Observable<HttpResponse<any>> {
    const relationLink = this.getRelationLink(relationName);
    const resourceId = _.last(_.split(resource.getSelfLinkHref(), '/'));

    if (_.isUndefined(resourceId) || _.isNull(resourceId)) {
      throw Error('relation should has id');
    }

    return getResourceHttpService().deleteResource(relationLink.href + '/' + resourceId, {
      observe: 'response'
    });
  }

  public getSelfLinkHref(): string {
    return this.getRelationLink('self').href;
  }

}
