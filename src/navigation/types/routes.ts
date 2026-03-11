export type RootStackParamList = {
  Main: undefined;
  AdminPinModal: {reason: string} | undefined;
  ProductSearch: undefined;
  DocumentViewer: {documentId: string};
  VideoPlayer: {videoId: string};
  FullscreenGallery: {mediaId: string};
};

export type MainTabParamList = {
  Home: undefined;
  Products: undefined;
  Technology: undefined;
  Solutions: undefined;
  Documents: undefined;
  Videos: undefined;
  Leads: undefined;
  Meetings: undefined;
  Settings: undefined;
};
