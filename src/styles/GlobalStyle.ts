import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html {
        background-color: ${({ theme }) => theme.base};
    }
    #root {
        font-family: 'Raleway', sans-serif;
        height: 100vh;
        padding-top: 25px;
        display: flex;
        justify-content: center;
        > div {
            width: calc(100vw - 50px);
            max-width: 326px;
            display: flex;
            flex-direction: column;
            align-items: center;
        } 
    }
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
        text-decoration: none;
    }
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    .btn {
        border: none;
        width: 100px;
        height: 46px;
        border-radius: 5px;
        color: ${({ theme }) => theme.base};
        font-size: 20px;
        font-weight: 700;
        cursor: pointer;
    }
    .btn-confirm {
        background-color: ${({ theme }) => theme.rose};
        
    }
    .alert-container {
        background-color: ${({ theme }) => theme.overlay};
    }
    .alert-title {
        color: ${({ theme }) => theme.text};
        font-weight: 700;
    }
`;
