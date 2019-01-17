export type CommitResult = {
  error?: Error;
  value?: any;
};

export type Mention = {
  index: number;
  handle: string;
  mention: string;
};

export type HeaderType = {
  type: string;
  scope?: string | null;
  subject: string;
};

export type SimpleHeader = {
  value: string;
};

export type Header = SimpleHeader | HeaderType;

export type Commit = {
  header: Header;
  body?: string | null;
  footer?: string | null;
  increment?: string | boolean;
  isBreaking?: boolean;
  mentions?: Array<Mention>;
};

export type PossibleCommit = string | Commit | Array<Commit>;

export type Plugin = (commit: Commit) => void | {} | Commit;
export type Plugins = Plugin | Array<Plugin>;
