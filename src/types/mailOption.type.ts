export type mailOption = {
    from: string;
    to: string;
    subject: string
    html: string;
    attachments?: Array<{
        filename: string;
        path: string;
      }>;
};