import { nextTick } from "vue";
import { useMediumZoom } from "@vuepress/plugin-medium-zoom/lib/client";
import { usePageData } from '@vuepress/client'
import type { PageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData<PageData>()
    console.log(page)
    const zoom = useMediumZoom();
    // 手动调用 `refresh` 来让这些新图片支持缩放
    nextTick(() => {
      zoom.refresh();
    });
  },
};
