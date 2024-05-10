package server.filters

import jakarta.servlet.FilterChain
import jakarta.servlet.ServletException
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import org.springframework.web.servlet.HandlerExceptionResolver
import server.service.JWTService


@Component
class JWTAuthFilter(
    private var handlerExceptionResolver: HandlerExceptionResolver,
    private var jwtService: JWTService,
    private var userDetailsService: UserDetailsService,
) : OncePerRequestFilter() {


    @Throws(ServletException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
        val cookies = request.cookies
        if (cookies == null || cookies.isEmpty()) { // No cookie with token passed so ignore that request
            filterChain.doFilter(request, response)
            return
        }
        try {
            val jwtTokenExists = cookies[0].name == "token"
            if (jwtTokenExists) {
                val token: String = cookies[0].value
                val userEmail: String = jwtService.extractUsername(token)
                val authentication: Authentication? = SecurityContextHolder.getContext().authentication
                if (authentication == null) {
                    val userDetails = userDetailsService.loadUserByUsername(userEmail)
                    if (jwtService.isTokenValid(token, userDetails)) {
                        val authToken = UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.authorities
                        )
                        authToken.details = WebAuthenticationDetailsSource().buildDetails(request)
                        SecurityContextHolder.getContext().authentication = authToken
                        logger.debug("Authenticated user using JWT")
                    }
                }
            }
            filterChain.doFilter(request, response)
        } catch (exception: Exception) {
            handlerExceptionResolver.resolveException(request, response, null, exception)
        }
    }
}