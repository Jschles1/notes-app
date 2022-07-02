import sanitizeHtml from 'sanitize-html';

const sanitize = (html) => {
    return sanitizeHtml(html, {
        allowedIframeHostnames: ['www.youtube.com'],
    });
};

export default sanitize;
