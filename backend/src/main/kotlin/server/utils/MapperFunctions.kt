package server.utils

import server.DTO.AdvisorDTO
import server.DTO.SignUpDTO
import server.entity.Advisor

fun Advisor.toAdvisorDTO(): AdvisorDTO = AdvisorDTO(
    firstName = firstName,
    lastName = lastName,
    username = username,
    id = id
)

fun AdvisorDTO.toAdvisor(): Advisor = Advisor(
    firstName = firstName,
    lastName = lastName,
)

fun SignUpDTO.toAdvisorDTO(): AdvisorDTO = AdvisorDTO(
    username = username,
    lastName = lastname,
    firstName = firstName,
    id = null,
)

