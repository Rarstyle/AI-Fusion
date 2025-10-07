package logger

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

type Config struct {
	Level  string
	Format string
	Output string
}

func NewLogger(cfg Config, env string) (*zap.Logger, error) {
	level, err := zap.ParseAtomicLevel(cfg.Level)
	if err != nil {
		return nil, err
	}

	encoding := "json"
	if cfg.Format == "text" {
		encoding = "console"
	}

	zapConfig := zap.Config{
		Level:            level,
		Development:      env == "development",
		Encoding:         encoding,
		OutputPaths:      []string{cfg.Output},
		ErrorOutputPaths: []string{cfg.Output},
		EncoderConfig: zapcore.EncoderConfig{
			// TimeKey:        "ts",
			LevelKey:       "level",
			NameKey:        "logger",
			CallerKey:      "caller",
			MessageKey:     "msg",
			StacktraceKey:  "stacktrace",
			LineEnding:     zapcore.DefaultLineEnding,
			EncodeLevel:    zapcore.LowercaseLevelEncoder,
			EncodeTime:     zapcore.EpochTimeEncoder,
			EncodeDuration: zapcore.SecondsDurationEncoder,
			EncodeCaller:   zapcore.ShortCallerEncoder,
		},
	}

	if env == "production" {
		zapConfig.Sampling = &zap.SamplingConfig{
			Initial:    100,
			Thereafter: 100,
		}
	}

	return zapConfig.Build()
}
