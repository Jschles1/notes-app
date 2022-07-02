module.exports = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
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
