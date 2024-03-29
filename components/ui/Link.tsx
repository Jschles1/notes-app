/**
 * Example provided by https://github.com/mui-org/material-ui/blob/1b9c44b82183d804c38b80dcad1fd9265d0761c8/examples/nextjs-with-typescript/src/components/Link.tsx
 */

import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled('a')({});

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
        Omit<NextLinkProps, 'href' | 'as'> {
    to: NextLinkProps['href'];
    linkAs?: NextLinkProps['as'];
    href?: NextLinkProps['href'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>(function NextLinkComposed(
    props,
    ref
) {
    const { to, linkAs, href, replace, scroll, shallow, prefetch, locale, ...other } = props;

    return (
        <NextLink
            href={to}
            prefetch={prefetch}
            as={linkAs}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref
            locale={locale}
        >
            <Anchor ref={ref} {...other} />
        </NextLink>
    );
});

export type LinkProps = {
    activeClassName?: string;
    as?: NextLinkProps['as'];
    href: NextLinkProps['href'];
    noLinkStyle?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
    Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(function Link(props, ref) {
    const {
        activeClassName = 'active',
        as: linkAs,
        className: classNameProps,
        href,
        noLinkStyle,
        role, // Link don't have roles.
        sx,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === 'string' ? href : href.pathname;
    const className = clsx(classNameProps, {
        [activeClassName]: router.pathname === pathname && activeClassName,
    });

    const isExternal = typeof href === 'string' && (href.indexOf('http') === 0 || href.indexOf('mailto:') === 0);

    /* istanbul ignore next */
    if (isExternal) {
        if (noLinkStyle) {
            return <Anchor className={className} href={href as any} ref={ref} {...other} />;
        }

        return <MuiLink className={className} href={href as any} ref={ref} {...other} />;
    }

    /* istanbul ignore next */
    if (noLinkStyle) {
        return <NextLinkComposed className={className} ref={ref} to={href} {...other} />;
    }

    return (
        <MuiLink
            component={NextLinkComposed}
            linkAs={linkAs}
            className={className}
            ref={ref}
            to={href}
            sx={[
                {
                    textDecoration: 'none',
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        />
    );
});

export default Link;
