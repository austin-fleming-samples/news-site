import styled from 'styled-components';

const SkipToMainLink = styled.a`
    display: block;
    position: fixed;
    left: 2em;
    top: 0;
    z-index: 9999;
    padding: 1em 2em;
    background-color: ${({ theme }) => theme.palette.background.contrastText};
    font-size: ${({ theme }) => theme.typography.button2};
    color: ${({ theme }) => theme.palette.background.main};

    transform: translateY(-120%);

    &:focus {
        transform: translateY(0);
    }
`;

export const SkipToMain = () => <SkipToMainLink href="#main-content">Skip to Content</SkipToMainLink>;
