package ch.zli.m223.punchclock.service;

import ch.zli.m223.punchclock.PunchclockApplication;
import ch.zli.m223.punchclock.domain.ApplicationUser;
import ch.zli.m223.punchclock.repository.ApplicationUserRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


public class UserService {
    private ApplicationUserRepository userRepoitory;
    private BCryptPasswordEncoder bCyrptPasswordEncoder;

    public UserService (ApplicationUserRepository userRepoitory, BCryptPasswordEncoder bCryptPasswordEncoder){
        this.userRepoitory = userRepoitory;
        this.bCyrptPasswordEncoder = bCryptPasswordEncoder;
    }

    public void createUser(ApplicationUser user){
        user.setPassword(bCyrptPasswordEncoder.encode(user.getPassword()));
        userRepoitory.save(user);
    }

}
