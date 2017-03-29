import Promise from 'bluebird';

const plugin = {
  register: (server, options, next) => {
    server.decorate('reply', 'withPaging', function(namedItems, totalCount) {
      /* eslint-disable fp/no-this */

      const buildQsFromObj = obj =>
        this.request.path +
        '?' +
        Object.keys(obj).map(k => `${k}=${obj[k]}`).join('&');

      const wrap = (items, tc) => {
        const query = this.request.query;
        const next = query.page != null && query.limit > 0 && tc >= 0
          ? query.page + 1
          : query.page;
        const prev = query.page > 0 && query.limit > 0
          ? query.page - 1
          : query.page;
        const nextQuery = Object.assign({}, query, { page: next });
        const prevQuery = Object.assign({}, query, { page: prev });

        let res = {
          ...items,
          meta: {
            totalCount: tc
          }
        };

        if(query.limit > 0) {
          res.meta.next = buildQsFromObj(nextQuery);
          res.meta.prev = buildQsFromObj(prevQuery);
        }

        return res;
      };

      return Promise.join(namedItems, totalCount)
        .spread(wrap)
        .then(res => this.response(res));
    });

    next();
  }
};

plugin.register.attributes = {
  name: 'with-paging'
};

export default plugin;
