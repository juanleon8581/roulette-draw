const $casserole = document.querySelector('#pCasserole');
const $oF = document.querySelector('#pOf');
const $twitch = document.querySelector('#pTwitch');

const casseroleRedirect = () => {
    const url = 'https://twitter.com/CasseroleGaming';
    window.open(url, '_blank').focus();
}

const oFRedirect = () => {
    const url = 'https://onlyfans.com/avacyn_archangel';
    window.open(url, '_blank').focus();
}

const twitchRedirect = () => {
    const url = 'https://www.twitch.tv/avacyn_archangel';
    window.open(url, '_blank').focus();
}

$casserole.addEventListener('click', casseroleRedirect);
$oF.addEventListener('click', oFRedirect);
$twitch.addEventListener('click', twitchRedirect);