import { defineConfig } from "tinacms";

export default defineConfig({
  // TinaCloud 연결 설정 (https://app.tina.io 에서 발급)
  branch: process.env.GITHUB_BRANCH ?? process.env.HEAD ?? "main",
  clientId: process.env.TINA_CLIENT_ID ?? "",
  token: process.env.TINA_TOKEN ?? "",

  build: {
    // TinaCMS 관리자 패널을 /tina-admin 으로 빌드
    outputFolder: "tina-admin",
    publicFolder: "public",
  },

  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      {
        name: "blog",
        label: "블로그 글",
        path: "src/content/blog",
        format: "md",
        defaultItem: () => ({
          draft: false,
          tags: [],
          pubDate: new Date().toISOString(),
        }),
        ui: {
          // 저장 후 글 미리보기 URL
          router: ({ document }) => `/posts/${document._sys.filename}`,
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "제목",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "설명",
            required: true,
            ui: {
              component: "textarea",
            },
          },
          {
            type: "datetime",
            name: "pubDate",
            label: "발행일",
            required: true,
          },
          {
            type: "datetime",
            name: "updatedDate",
            label: "수정일",
          },
          {
            type: "boolean",
            name: "draft",
            label: "초안 (비공개)",
          },
          {
            type: "string",
            name: "category",
            label: "카테고리",
          },
          {
            type: "string",
            name: "tags",
            label: "태그",
            list: true,
          },
          {
            // WYSIWYG 리치 텍스트 에디터 - 실제 블로그에서 보이는 것처럼 표시
            type: "rich-text",
            name: "body",
            label: "내용",
            isBody: true,
          },
        ],
      },
    ],
  },
});
