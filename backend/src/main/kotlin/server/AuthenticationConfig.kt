package server


import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authentication.ProviderManager
import org.springframework.security.authentication.dao.DaoAuthenticationProvider
import org.springframework.security.config.Customizer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.SecurityFilterChain
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.CorsConfigurationSource
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import server.service.AdvisorService


@Configuration
@EnableWebSecurity
class AuthenticationConfiguration {


    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        return http.cors(Customizer.withDefaults())
            .csrf { csrf -> csrf.disable() }
            .authorizeHttpRequests { config ->
                config.anyRequest().permitAll()
//                    .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
//                    .requestMatchers(HttpMethod.POST, "/api/auth/signup").permitAll()
//                    .requestMatchers(HttpMethod.OPTIONS).permitAll()
//                    .requestMatchers("/api/*").authenticated()
            }.httpBasic { }.formLogin { formLogin -> formLogin.disable() }
            .build()
    }

    @Bean
    fun corsConfigurationSource(): CorsConfigurationSource {
        val configuration = CorsConfiguration()
        configuration.allowedOrigins = mutableListOf("http://localhost:5173")
        configuration.allowedMethods = mutableListOf("GET", "POST", "PUT", "OPTIONS", "DELETE")
//        configuration.maxAge = 36000
//        configuration.allowCredentials = false
        configuration.allowedHeaders = listOf("*")
        val source: UrlBasedCorsConfigurationSource = UrlBasedCorsConfigurationSource()
        source.registerCorsConfiguration("/**", configuration)
        return source
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
        return BCryptPasswordEncoder(12)
    }


}