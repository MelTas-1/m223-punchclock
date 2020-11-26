/*package ch.zli.m223.punchclock.security;

import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Value(value = "${auth0.apiAudience}")
	private String apiAudience;

	@Value(value = "${auth0.issuer}")
	private String issuer;

	@Override
	protected void configure(HttpSecurity httpSecurity) throws Exception {
		JwtWebSecurityConfigurer
				.forRS256(apiAudience, issuer)
				.configure(httpSecurity)
				.cors()
				.and()
				.csrf()
				.disable()
				.authorizeRequests()
				.anyRequest()
				.permitAll();
	}
}
*/