export const deskStructure = (S) =>
  S.list()
    .title('DM Legal Content')
    .items([
      S.listItem()
        .title('Blog Posts')
        .child(
          S.documentList()
            .title('All Posts')
            .filter('_type == "post"')
            .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
        ),
    ])
