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
    private val jwtService: JWTService,
    private val userDetailsService: UserDetailsService,
    private var  handlerExceptionResolver: HandlerExceptionResolver
) : OncePerRequestFilter() {

    @Throws(ServletException::class)
    override fun doFilterInternal(
        request: HttpServletRequest,
        response: HttpServletResponse,
        filterChain: FilterChain
    ) {
            try {
                val cookies = request.cookies
                if (cookies != null && cookies[0].name ==  "token") { // some error here coz second request after logging in not going through
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

                }catch(e:Exception){
                    logger.error(e.message)
                    handlerExceptionResolver.resolveException(request, response, null, e);
            }
            filterChain.doFilter(request,response)

    }

}