package server.controller


import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import server.service.AdvisorService


@Configuration
@EnableWebSecurity
class AuthenticationConfiguration {

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http.csrf{}.cors{}.
        authorizeHttpRequests {
            authorizationConfig -> authorizationConfig.
            requestMatchers(HttpMethod.GET,"/*","/assets/*").authenticated().
        requestMatchers(HttpMethod.POST,"/api/login").fullyAuthenticated()
        }.
        httpBasic{}.
        formLogin {}.
            sessionManagement{ httpSecuritySessionManagementConfigurer ->
                httpSecuritySessionManagementConfigurer.sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED).
                maximumSessions(1)}.build()
    }

    @Bean
    fun authenticationManager(
        userDetailsService: AdvisorService,
        passwordEncoder: PasswordEncoder
    ): AuthenticationManager {
        val authenticationProvider = DaoAuthenticationProvider()
        authenticationProvider.setUserDetailsService(userDetailsService)
        authenticationProvider.setPasswordEncoder(passwordEncoder)

        return ProviderManager(authenticationProvider)
    }


    @Bean

    fun passwordEncoder(): BCryptPasswordEncoder? {
        @Value("${spa.ecoder-strth}")
        va
        return BCryptPasswordEncoder()
    }


}