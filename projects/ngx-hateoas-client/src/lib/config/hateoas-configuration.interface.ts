/**
 * Describe all client configuration params.
 */
export interface HateoasConfiguration {

  /**
   * Http options.
   */
  http: {
    /**
     * Root server url.
     *
     * For default Spring application it looks like: http://localhost:8080.
     */
    rootUrl: string;
    /**
     * Proxy url on which to send requests.
     * If passed then it uses to change baseUrl to proxyUrl when get relation link.
     *
     * For default Spring application it looks like: http://localhost:8080/api/v1.
     */
    proxyUrl?: string;
  };

  /**
   * Logging option.
   */
  logs?: {
    /**
     * Should print verbose logs to the console.
     */
    verboseLogs?: boolean;
  };

  /**
   * Cache options.
   */
  cache?: {
    /**
     * When {@code true} then cache will be used, {@code false} otherwise.
     */
    enabled: boolean;
    /**
     * Time in seconds after which cache need to be expired.
     */
    lifeTime?: number;
  };

  /**
   * Comparable lib settings.
   */
  comparable?: {
    /**
     * Enable comparable mode with ngx-hal-client library.
     */
    ngxHalClient?: boolean;
  };

}