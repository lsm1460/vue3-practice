import { MEMBER_JOIN_STEP } from '../consts'

export type MemberJoinStepType = (typeof MEMBER_JOIN_STEP)[number]
export type MemberJoinProps = { isShow: boolean; moveStep: () => void }
