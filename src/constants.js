export const devServerApiURL = () => ('http://localhost:5000/api/v2/captioning')
export const deployServerApiURL = () => ('http://ec2-34-216-255-37.us-west-2.compute.amazonaws.com/api/v2/captioning')
export const iLearnURL = () => ('https://ilearn.support.at.sfsu.edu/ay2122/course/view.php?id=')
export const fileDownloadUrl = () => ("http://localhost:5000/api/v2/captioning/services/download/file")
export const astJobURL = () =>  ("https://web.automaticsync.com/show_details.php?show_id=")
export const devServerUrl = () => ("http:localhost:5000")
export const deployURL = () => ("https://amp-dev.sfsu.edu/")
export const currentSemester = () => ("fa22")

function environment(value) {
    if (value === 'production') {
        return deployServerApiURL()
    } else {
        return devServerApiURL()

    }
}

let env_value = process.env.NODE_ENV

export const endpoint = () => (environment(env_value))