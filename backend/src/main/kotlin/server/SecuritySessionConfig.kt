package server

import org.springframework.security.web.context.HttpSessionSecurityContextRepository

class SecuritySessionConfig : HttpSessionSecurityContextRepository() {
}