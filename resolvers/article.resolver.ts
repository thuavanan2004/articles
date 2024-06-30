import Article from "../models/article.model";

export const resolversArticle = {
  Query: {
    getListArticle: async (_, args) => {
      const find = { deleted: false };
      const {
        sortKey,
        sortValue,
        currentPage,
        limitItems,
        filterKey,
        filterValue,
        keyword,
      } = args;

      const sort = {};

      const skip = (currentPage - 1) * limitItems;
      if (sortKey && sortValue) {
        sort["sortKey"] = sortValue;
      }

      if (filterKey && filterValue) {
        find["filterKey"] = filterValue;
      }

      if (keyword) {
        const regexKeyword = new RegExp(keyword, "i");
        find["title"] = regexKeyword;
      }

      const articles = await Article.find(find)
        .sort(sort)
        .limit(limitItems)
        .skip(skip);

      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;
      const article = await Article.findOne({
        _id: id,
        deleted: false,
      });

      return article;
    },
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;

      const newRecord = new Article(article);
      await newRecord.save();

      return newRecord;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;
      await Article.updateOne(
        {
          _id: id,
        },
        {
          deleted: true,
        }
      );
      return "Delete item successfuly";
    },
    updateArticle: async (_, args) => {
      const { id, article } = args;

      await Article.updateOne(
        {
          _id: id,
          deleted: false,
        },
        article
      );

      const data = await Article.findOne({
        _id: id,
      });
      return data;
    },
  },
};
