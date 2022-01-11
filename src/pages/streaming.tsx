import { useEffect } from "react";

import { Jutsu } from "react-jutsu";

import Loading from "../components/Loading";

// https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe
// https://github.com/jitsi/jitsi-meet/blob/master/config.js
// https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js

const Streaming = ({ user, role }) => {

    const roomName = 'radikal-gym'
    const displayName = user.id ? `${user.firstName} ${user.lastName}` : ''


    const clientConfig = {
        startWithAudioMuted: true,
        requireDisplayName: true,
        disableModeratorIndicator: true,
        defaultLanguage: 'es',
        disableReactions: true,
        disableReactionsModeration: true,
        disableSelfView: true,
        liveStreamingEnabled: false,
        disablePolls: true,
    };

    const instructorConfig = {
        defaultLanguage: 'es'
    };

    const jitsiConfig = {
        roomName,
        displayName,
        subject: 'Clase Online Gratuita',
        onMeetingEnd: () => console.log('Meeting has ended'),
        loadingComponent: <Loading name="Streaming" />,
        errorComponent: <p>Oops, something went wrong</p>,
        configOverwrite: role === 'instructor' ? instructorConfig : clientConfig
    }

    return <div>
        <Jutsu {...jitsiConfig} />
    </div>;
};

export default Streaming;
