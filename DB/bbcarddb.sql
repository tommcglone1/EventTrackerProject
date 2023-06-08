-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema bbcarddb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `bbcarddb` ;

-- -----------------------------------------------------
-- Schema bbcarddb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bbcarddb` DEFAULT CHARACTER SET utf8 ;
USE `bbcarddb` ;

-- -----------------------------------------------------
-- Table `card_condition`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card_condition` ;

CREATE TABLE IF NOT EXISTS `card_condition` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `grade`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `grade` ;

CREATE TABLE IF NOT EXISTS `grade` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `card`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `card` ;

CREATE TABLE IF NOT EXISTS `card` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `player_name` VARCHAR(45) NOT NULL,
  `number` VARCHAR(45) NOT NULL,
  `team` VARCHAR(45) NULL,
  `box_set` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `img_url` VARCHAR(2000) NULL,
  `year` INT(4) NULL,
  `autographed` TINYINT NULL,
  `rookie` TINYINT NULL,
  `manufacturer` VARCHAR(45) NULL,
  `sale_value` DOUBLE NULL,
  `trade_value` DOUBLE NULL,
  `active` VARCHAR(45) NOT NULL,
  `created` DATETIME NULL,
  `updated` DATETIME NULL,
  `sp_number` VARCHAR(45) NULL,
  `parallel` VARCHAR(45) NULL,
  `card_condition_id` INT NOT NULL,
  `grade_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_card_card_condition_idx` (`card_condition_id` ASC),
  INDEX `fk_card_grade1_idx` (`grade_id` ASC),
  CONSTRAINT `fk_card_card_condition`
    FOREIGN KEY (`card_condition_id`)
    REFERENCES `card_condition` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_card_grade1`
    FOREIGN KEY (`grade_id`)
    REFERENCES `grade` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(200) NOT NULL,
  `enabled` TINYINT NOT NULL,
  `role` VARCHAR(45) NOT NULL,
  `email` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_has_card`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_has_card` ;

CREATE TABLE IF NOT EXISTS `user_has_card` (
  `user_id` INT NOT NULL,
  `card_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `card_id`),
  INDEX `fk_user_has_card_card1_idx` (`card_id` ASC),
  INDEX `fk_user_has_card_user1_idx` (`user_id` ASC),
  CONSTRAINT `fk_user_has_card_user1`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_card_card1`
    FOREIGN KEY (`card_id`)
    REFERENCES `card` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS collector@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'collector'@'localhost' IDENTIFIED BY 'collector';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'collector'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `card_condition`
-- -----------------------------------------------------
START TRANSACTION;
USE `bbcarddb`;
INSERT INTO `card_condition` (`id`, `name`) VALUES (1, 'Near Mint or Better');
INSERT INTO `card_condition` (`id`, `name`) VALUES (2, 'Excellent');
INSERT INTO `card_condition` (`id`, `name`) VALUES (3, 'Very Good');
INSERT INTO `card_condition` (`id`, `name`) VALUES (4, 'Good');
INSERT INTO `card_condition` (`id`, `name`) VALUES (5, 'Poor');

COMMIT;


-- -----------------------------------------------------
-- Data for table `grade`
-- -----------------------------------------------------
START TRANSACTION;
USE `bbcarddb`;
INSERT INTO `grade` (`id`, `name`) VALUES (1, 'Poor to Fair');
INSERT INTO `grade` (`id`, `name`) VALUES (2, 'Good');
INSERT INTO `grade` (`id`, `name`) VALUES (3, 'Very Good');
INSERT INTO `grade` (`id`, `name`) VALUES (4, 'Very Good-Excellent');
INSERT INTO `grade` (`id`, `name`) VALUES (5, 'Excellent');
INSERT INTO `grade` (`id`, `name`) VALUES (6, 'Excellent-Mint');
INSERT INTO `grade` (`id`, `name`) VALUES (7, 'Near Mint');
INSERT INTO `grade` (`id`, `name`) VALUES (8, 'Near Mint-Mint');
INSERT INTO `grade` (`id`, `name`) VALUES (9, 'Mint');
INSERT INTO `grade` (`id`, `name`) VALUES (10, 'Gem Mint');

COMMIT;


-- -----------------------------------------------------
-- Data for table `card`
-- -----------------------------------------------------
START TRANSACTION;
USE `bbcarddb`;
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (1, 'Ryan Howard', 'BSA-RH', 'Phillies', 'Series 1', 'Stars of MLB', 'https://i.ebayimg.com/images/g/NY8AAOSwSWpj8QMY/s-l1600.jpg', 2023, 1, 0, 'Topps', 16.50, 25.50, '1', NULL, NULL, '98/99', 'Black Border', 2, NULL);
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (2, 'Hunter Greene', '155', 'Reds', 'Series 1', 'Base', 'https://i.ebayimg.com/images/g/S0gAAOSwa8Zj8rIh/s-l1600.jpg', 2023, 0, 0, 'Topps', 65.00, 85.00, '1', NULL, NULL, NULL, 'Gold Image SSP', 2, 8);
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (3, 'Ryan Howard', '87TBA-RH', 'Phillies', 'Clearly Authentic', '35th Anniversary', NULL, 2022, 1, 0, 'Topps', 125.00, 150.00, '1', NULL, NULL, '1/1', 'Super Refractor', 1, NULL);
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (4, 'Ryan Howard', '87TBA-RH', 'Phillies', 'Clearly Authentic', '35th Anniversary', NULL, 2022, 1, 0, 'Topps', 80.00, 100.00, '1', NULL, NULL, '2/5', 'Orange Border', 1, NULL);
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (5, 'Ryan Howard', '87TBA-RH', 'Phillies', 'Clearly Authentic', '35th Anniversary', 'https://i.ebayimg.com/images/g/4ioAAOSw3f5jv4X~/s-l1600.jpg', 2022, 1, 0, 'Topps', 60, 80, '1', NULL, NULL, '26/50', 'Red Border', 1, NULL);
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (6, 'Ricardo Cabrera', 'B22-RCA', 'Reds', 'Bowman\'s Best', 'Base Prospect', 'https://i.ebayimg.com/images/g/3PQAAOSwie1kYp2n/s-l500.jpg', 2022, 1, 0, 'Topps', 25, 50, '1', NULL, NULL, '33/50', 'Gold Background', 1, NULL);
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (7, 'Terrin Vavra', 'T88C-10', 'Orioles', 'Series 1', '35th Anniversary', 'https://i.ebayimg.com/images/g/jv8AAOSwNHJj7UFj/s-l400.jpg', 2023, 0, 1, 'Topps', 10, 20, '1', NULL, NULL, NULL, 'Chrome', 1, 10);

COMMIT;


-- -----------------------------------------------------
-- Data for table `user`
-- -----------------------------------------------------
START TRANSACTION;
USE `bbcarddb`;
INSERT INTO `user` (`id`, `username`, `password`, `enabled`, `role`, `email`) VALUES (1, 'tom', '$2a$10$nShOi5/f0bKNvHB8x0u3qOpeivazbuN0NE4TO0LGvQiTMafaBxLJS', 1, 'standard', 'thomas.mcglone00@gmail.com');

COMMIT;


-- -----------------------------------------------------
-- Data for table `user_has_card`
-- -----------------------------------------------------
START TRANSACTION;
USE `bbcarddb`;
INSERT INTO `user_has_card` (`user_id`, `card_id`) VALUES (1, 1);
INSERT INTO `user_has_card` (`user_id`, `card_id`) VALUES (1, 2);
INSERT INTO `user_has_card` (`user_id`, `card_id`) VALUES (1, 3);
INSERT INTO `user_has_card` (`user_id`, `card_id`) VALUES (1, 4);
INSERT INTO `user_has_card` (`user_id`, `card_id`) VALUES (1, 5);
INSERT INTO `user_has_card` (`user_id`, `card_id`) VALUES (1, 6);
INSERT INTO `user_has_card` (`user_id`, `card_id`) VALUES (1, 7);

COMMIT;

