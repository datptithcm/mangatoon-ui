import { useEffect, useState } from "react"
import { FAILED, IDLE, PENDING, SUCCEEDED } from "../../../../../../../constants/fetchStatus.constant"
import api from "../../../../../../../api"
import { useSelector } from "react-redux"
import { userSelectors } from "../../../../../../../features/user.feature"

function useSignOut() {
    const [isSubmit, setSubmit] = useState(false)
    const [data, setData] = useState(undefined)
    const [status, setStatus] = useState(IDLE)
    const tokens = useSelector(userSelectors.selectTokens)

    useEffect(() => {
        async function submit() {
            try {
                setStatus(PENDING)
                const response = await api.user.signOut(tokens)
                setData(response.data)
                setStatus(SUCCEEDED)
            } catch (error) {
                setStatus(FAILED)
            }
        }

        if (isSubmit) {
            submit()
        }
    }, [isSubmit])

    useEffect(() => {
        if (status === SUCCEEDED || status === FAILED) {
            setSubmit(false)
        }
    }, [status])

    return {
        data,
        status,
        setSubmit
    }
}

export default useSignOut
