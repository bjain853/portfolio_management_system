package server.controller

import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.boot.web.servlet.error.ErrorController
import org.springframework.http.HttpMethod
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping



@Controller
class SpaErrorController : ErrorController {
    @RequestMapping("/error")
    fun error(request: HttpServletRequest, response: HttpServletResponse): Any {
        // place your additional code here (such as error logging...)
        if (request.method.equals(HttpMethod.GET.name(), ignoreCase = true)) {
            response.status = HttpStatus.OK.value() // optional.
            return "forward:/index.html" // forward to static SPA html resource.
        } else {
            return ResponseEntity.notFound().build<Any>() // or your REST 404 blabla...
        }
    }

    val errorPath: String
        get() = "/error"
}