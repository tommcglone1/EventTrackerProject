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
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (1, 'Ryan Howard', 'BSA-RH', 'Phillies', 'Series 1', 'Stars of MLB', 'https://i.ebayimg.com/images/g/NY8AAOSwSWpj8QMY/s-l1600.jpg', 2023, 1, 0, 'Topps', 16.50, 25.50, '1', NULL, NULL, '98/99', 'Black', 2, NULL);
INSERT INTO `card` (`id`, `player_name`, `number`, `team`, `box_set`, `type`, `img_url`, `year`, `autographed`, `rookie`, `manufacturer`, `sale_value`, `trade_value`, `active`, `created`, `updated`, `sp_number`, `parallel`, `card_condition_id`, `grade_id`) VALUES (2, 'Hunter Greene', '155', 'Reds', 'Series 1', 'Base', 'https://i.ebayimg.com/images/g/S0gAAOSwa8Zj8rIh/s-l1600.jpg', 2023, 0, 0, 'Topps', 65.00, 85.00, '1', NULL, NULL, NULL, 'Gold Image SSP', 2, 8);

COMMIT;

