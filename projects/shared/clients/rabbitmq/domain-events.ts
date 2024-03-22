export type MetaType = {
  ocurrend_by?: string;
  isLegacy: string;
};

export interface DomaintEvent<T> {
  data: {
    id: string;
    type: string;
    occurred_on: Date;
    attributes: T;
    meta?: MetaType;
  };
}
