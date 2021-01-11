export const devServerApiURL = () => ('http://localhost:5000/api/v2/captioning')
export const deployServerApiURL = () => ('https://amp-dev.sfsu.edu/api/v2/captioning')
export const iLearnURL = () => ('https://ilearn.support.at.sfsu.edu/ay2021/course/view.php?id=')
export const fileDownloadUrl = () => ("http://localhost:5000/api/v2/captioning/services/download/file")
export const astJobURL = () =>  ("https://web.automaticsync.com/show_details.php?show_id=")
export const devServerUrl = () => ("http:localhost:5000")
export const deployURL = () => ("https://www.amp-dev.sfsu.edu")
export const currentSemester = () => ("sp20")


function environment(value) {
    if (value === true) {
        return deployServerApiURL()
    } else {
        return devServerApiURL()

    }

}

// true for deployed false for dev

let env_value = false


export const endpoint = () => (environment(env_value))