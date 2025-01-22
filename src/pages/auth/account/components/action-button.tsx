import { useContext } from "react"
import { AccountContext } from "../context"
import { METHODS, useHttpMutation } from "../../../../helpers/useHttp"
import { IResponse } from "../../../../helpers/types"

export const ActionButton: React.FC = () => {
    const context = useContext(AccountContext)
    if (!context) throw new Error("Out of provider...")

    const { account, refetch } = context
    const { following, followsMe, requested } = account.connection

    const [makeRequest] = useHttpMutation<IResponse>(refetch)

    const handleRequest = () => {
        const path = following ? `/account/unfollow/${account.id}` : `/account/follow/${account.id}`
        makeRequest(path, METHODS.POST)
    }

    return (
        <>
            <button onClick={handleRequest} className="px-2 py-1 my-2 rounded-md bg-pink-500">
                {following ? 
                    "unfollow" :
                    followsMe ? 
                        "follow back" :
                        requested ? 
                            "cancel" : 
                            "follow"
                }
            </button>
        </>
    )
}
