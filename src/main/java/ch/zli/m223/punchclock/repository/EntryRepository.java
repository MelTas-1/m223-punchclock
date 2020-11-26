package ch.zli.m223.punchclock.repository;

import ch.zli.m223.punchclock.domain.ApplicationUser;
import ch.zli.m223.punchclock.domain.Entry;
import net.bytebuddy.TypeCache;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.*;

public interface EntryRepository extends JpaRepository<Entry, Long> {

}
