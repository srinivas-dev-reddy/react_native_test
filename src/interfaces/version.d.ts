export interface Version {
  versionString: string;
  os: string;
  isRequired: boolean;
  createdAt: string;
}

export interface VersionResp {
  required?: Version;
  optional?: Version;
}
