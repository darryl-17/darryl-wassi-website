import { type SchemaTypeDefinition } from 'sanity';
import { siteSettings } from './siteSettings';
import { venture } from './venture';
import { timelineItem } from './timelineItem';
import { newsItem } from './newsItem';
import { show } from './show';
import { subscriber } from './subscriber';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, venture, timelineItem, newsItem, show, subscriber],
};
