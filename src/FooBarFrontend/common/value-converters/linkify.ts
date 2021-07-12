import linkifyHtml from 'linkifyjs/html';

export class LinkifyValueConverter {
    toView(html) {
        if (!html) {
            return html;
        }

        try {
            return linkifyHtml(html, {
                target: (href: string) => {
                    let loweredhref = href.toLowerCase();
                    if (loweredhref.indexOf('http') === 0) {
                        return '_blank';
                    }
                    return null;
                },
                attributes: {
                    rel: 'noopener nofollow'
                }
            });
        }
        catch {
            return html;
        }
    }
}