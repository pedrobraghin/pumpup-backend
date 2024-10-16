export class BuildPayload {
  id: string;
  parentBuildId: string | null;
  appId: string;
  initiatingUserId: string;
  cancelingUserId: string | null;
  platform: string;
  status: string;
  artifacts: {
    buildUrl: string;
    applicationArchiveUrl: string;
  };
  metadata: {
    appName: string;
    username: string;
    workflow: string;
    runFromCI: boolean;
    simulator: boolean;
    appVersion: string;
    cliVersion: string;
    sdkVersion: string;
    buildProfile: string;
    distribution: string;
    appIdentifier: string;
    gitCommitHash: string;
    appBuildVersion: string;
    trackingContext: {
      local: boolean;
      no_wait: boolean;
      platform: string;
      account_id: string;
      dev_client: boolean;
      project_id: string;
      run_from_ci: boolean;
      sdk_version: string;
      tracking_id: string;
      project_type: string;
      dev_client_version: string;
    };
    gitCommitMessage: string;
    credentialsSource: string;
    developmentClient: boolean;
    runWithNoWaitFlag: boolean;
    reactNativeVersion: string;
    projectMetadataFile: {
      type: string;
      bucketKey: string;
    };
    isGitWorkingTreeDirty: boolean;
    requiredPackageManager: string;
  };
  metrics: {
    buildEgressBytes: number;
    buildEndTimestamp: number;
    buildIngressBytes: number;
    buildStartTimestamp: number;
  };
  error: {
    message: string;
    errorCode: string;
  } | null;
  createdAt: string;
  provisioningStartedAt: string;
  workerStartedAt: string;
  completedAt: string;
  updatedAt: string;
  expirationDate: string;
  priority: string;
  resourceClass: string;
  actualResourceClass: string;
  requestedResourceClass: string;
  maxRetryTimeMinutes: number;
  usageInformationSentToBigQuery: boolean;
  buildWebhookCalled: boolean;
  waivedAt: string;
  buildMode: string;
  waiverType: string;
  accountName: string;
  projectName: string;
  buildDetailsPageUrl: string;
}
