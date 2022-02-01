module.exports = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/folders',
                permanent: true,
            },
        ];
    },
};
