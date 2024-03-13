package server.controller

import jakarta.servlet.RequestDispatcher
import jakarta.servlet.http.HttpServletRequest
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.http.HttpStatus
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping


@Controller
class GlobalErrorController : ErrorController {
    private val log: Logger = LoggerFactory.getLogger(GlobalErrorController::class.java)

    @RequestMapping("/error")
    fun handleError(request: HttpServletRequest): String? {
        val status = request.getAttribute(RequestDispatcher.ERROR_STATUS_CODE)
        if (status != null) {
            val statusCode = status.toString().toInt()

            if (statusCode == HttpStatus.NOT_FOUND.value()) {
                return "error-404"
            } else if (statusCode == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                return "error-500"
            } else if (statusCode == HttpStatus.FORBIDDEN.value()) {
                return "error-403"
            }
        }
        return "Something went wrong"
    }
}